const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLSchema, GraphQLNonNull } = require('graphql');
const mongoose = require('mongoose');
const Task = mongoose.model('Task', {
    title: String,
    description: String,
    completed: Boolean
});

// Task Type
const TaskType = new GraphQLObjectType({
    name: 'Task',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        completed: { type: GraphQLString }
    })
});

// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        task: {
            type: TaskType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Task.findById(args.id);
            }
        },
        tasks: {
            type: new GraphQLList(TaskType),
            resolve(parent, args) {
                return Task.find({});
            }
        }
    }
});

// Mutations
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addTask: {
            type: TaskType,
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: new GraphQLNonNull(GraphQLString) },
                completed: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let task = new Task({
                    title: args.title,
                    description: args.description,
                    completed: args.completed
                });
                return task.save();
            }
        },
        updateTask: {
            type: TaskType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                title: { type: GraphQLString },
                description: { type: GraphQLString },
                completed: { type: GraphQLString }
            },
            resolve(parent, args) {
                return Task.findByIdAndUpdate(args.id, {
                    title: args.title,
                    description: args.description,
                    completed: args.completed
                }, { new: true });
            }
        },
        deleteTask: {
            type: TaskType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(parent, args) {
                return Task.findByIdAndDelete(args.id);
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
