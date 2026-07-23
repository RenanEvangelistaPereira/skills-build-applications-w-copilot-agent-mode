"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const database_1 = require("../config/database");
const Activity_1 = __importDefault(require("../models/Activity"));
const LeaderboardEntry_1 = __importDefault(require("../models/LeaderboardEntry"));
const Team_1 = __importDefault(require("../models/Team"));
const User_1 = __importDefault(require("../models/User"));
const Workout_1 = __importDefault(require("../models/Workout"));
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await (0, database_1.connectDatabase)();
        await Promise.all([
            User_1.default.deleteMany({}),
            Team_1.default.deleteMany({}),
            Activity_1.default.deleteMany({}),
            LeaderboardEntry_1.default.deleteMany({}),
            Workout_1.default.deleteMany({})
        ]);
        await User_1.default.insertMany([
            {
                username: 'alex-runner',
                email: 'alex.runner@example.com',
                displayName: 'Alex Rivera',
                fitnessGoal: 'Train for a half marathon',
                weeklyActivityMinutes: 285
            },
            {
                username: 'maya-lifts',
                email: 'maya.lifts@example.com',
                displayName: 'Maya Chen',
                fitnessGoal: 'Build functional strength',
                weeklyActivityMinutes: 240
            },
            {
                username: 'sam-yoga',
                email: 'sam.yoga@example.com',
                displayName: 'Sam Patel',
                fitnessGoal: 'Improve mobility and recovery',
                weeklyActivityMinutes: 180
            }
        ]);
        await Team_1.default.insertMany([
            {
                name: 'Trail Blazers',
                motto: 'Every mile counts',
                memberCount: 8,
                weeklyPoints: 8420
            },
            {
                name: 'Core Crew',
                motto: 'Strong together',
                memberCount: 6,
                weeklyPoints: 7650
            },
            {
                name: 'Recovery Rebels',
                motto: 'Rest is training',
                memberCount: 5,
                weeklyPoints: 6120
            }
        ]);
        await Activity_1.default.insertMany([
            {
                userName: 'Alex Rivera',
                activityType: 'Outdoor run',
                durationMinutes: 52,
                caloriesBurned: 610,
                activityDate: new Date('2026-07-20T13:30:00Z')
            },
            {
                userName: 'Maya Chen',
                activityType: 'Strength circuit',
                durationMinutes: 45,
                caloriesBurned: 430,
                activityDate: new Date('2026-07-21T22:00:00Z')
            },
            {
                userName: 'Sam Patel',
                activityType: 'Vinyasa yoga',
                durationMinutes: 40,
                caloriesBurned: 190,
                activityDate: new Date('2026-07-22T12:15:00Z')
            }
        ]);
        await LeaderboardEntry_1.default.insertMany([
            {
                rank: 1,
                userName: 'Alex Rivera',
                teamName: 'Trail Blazers',
                points: 3280
            },
            {
                rank: 2,
                userName: 'Maya Chen',
                teamName: 'Core Crew',
                points: 3010
            },
            {
                rank: 3,
                userName: 'Sam Patel',
                teamName: 'Recovery Rebels',
                points: 2490
            }
        ]);
        await Workout_1.default.insertMany([
            {
                title: 'Tempo Run Builder',
                focusArea: 'Endurance',
                difficulty: 'Intermediate',
                durationMinutes: 38,
                recommendedForGoal: 'Train for a half marathon'
            },
            {
                title: 'Total Body Strength Ladder',
                focusArea: 'Strength',
                difficulty: 'Intermediate',
                durationMinutes: 42,
                recommendedForGoal: 'Build functional strength'
            },
            {
                title: 'Mobility Reset Flow',
                focusArea: 'Mobility',
                difficulty: 'Beginner',
                durationMinutes: 24,
                recommendedForGoal: 'Improve mobility and recovery'
            }
        ]);
        console.log('Database seeding complete');
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
