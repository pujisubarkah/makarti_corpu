import { relations } from "drizzle-orm/relations";
import { courses, courseInfo, users, competencies, courseSections, roles, enrollments, sectionProgress, sectionQuizzes, sectionVideos, topics, posts, competencyCategories, quizResponses, sectionContents, courseProgress, assessment } from "./schema";

export const courseInfoRelations = relations(courseInfo, ({one}) => ({
	course: one(courses, {
		fields: [courseInfo.courseId],
		references: [courses.id]
	}),
}));

export const coursesRelations = relations(courses, ({one, many}) => ({
	courseInfos: many(courseInfo),
	user: one(users, {
		fields: [courses.instructorId],
		references: [users.id]
	}),
	competency: one(competencies, {
		fields: [courses.competencyId],
		references: [competencies.id]
	}),
	courseSections: many(courseSections),
	enrollments: many(enrollments),
	courseProgresses: many(courseProgress),
}));

export const usersRelations = relations(users, ({one, many}) => ({
	courses: many(courses),
	role_roleId: one(roles, {
		fields: [users.roleId],
		references: [roles.id],
		relationName: "users_roleId_roles_id"
	}),
	role_roleId: one(roles, {
		fields: [users.roleId],
		references: [roles.id],
		relationName: "users_roleId_roles_id"
	}),
	enrollments: many(enrollments),
	sectionProgresses: many(sectionProgress),
	topics: many(topics),
	posts: many(posts),
	quizResponses: many(quizResponses),
	courseProgresses: many(courseProgress),
}));

export const competenciesRelations = relations(competencies, ({one, many}) => ({
	courses: many(courses),
	competencyCategory: one(competencyCategories, {
		fields: [competencies.categoryId],
		references: [competencyCategories.id]
	}),
	assessments: many(assessment),
}));

export const courseSectionsRelations = relations(courseSections, ({one, many}) => ({
	course: one(courses, {
		fields: [courseSections.courseId],
		references: [courses.id]
	}),
	sectionProgresses: many(sectionProgress),
	sectionQuizzes: many(sectionQuizzes),
	sectionVideos: many(sectionVideos),
	sectionContents: many(sectionContents),
	courseProgresses: many(courseProgress),
}));

export const rolesRelations = relations(roles, ({many}) => ({
	users_roleId: many(users, {
		relationName: "users_roleId_roles_id"
	}),
	users_roleId: many(users, {
		relationName: "users_roleId_roles_id"
	}),
}));

export const enrollmentsRelations = relations(enrollments, ({one}) => ({
	user: one(users, {
		fields: [enrollments.userId],
		references: [users.id]
	}),
	course: one(courses, {
		fields: [enrollments.courseId],
		references: [courses.id]
	}),
}));

export const sectionProgressRelations = relations(sectionProgress, ({one}) => ({
	user: one(users, {
		fields: [sectionProgress.userId],
		references: [users.id]
	}),
	courseSection: one(courseSections, {
		fields: [sectionProgress.sectionId],
		references: [courseSections.id]
	}),
}));

export const sectionQuizzesRelations = relations(sectionQuizzes, ({one, many}) => ({
	courseSection: one(courseSections, {
		fields: [sectionQuizzes.sectionId],
		references: [courseSections.id]
	}),
	quizResponses: many(quizResponses),
}));

export const sectionVideosRelations = relations(sectionVideos, ({one}) => ({
	courseSection: one(courseSections, {
		fields: [sectionVideos.sectionId],
		references: [courseSections.id]
	}),
}));

export const topicsRelations = relations(topics, ({one, many}) => ({
	user: one(users, {
		fields: [topics.userId],
		references: [users.id]
	}),
	posts: many(posts),
}));

export const postsRelations = relations(posts, ({one}) => ({
	topic: one(topics, {
		fields: [posts.topicId],
		references: [topics.id]
	}),
	user: one(users, {
		fields: [posts.userId],
		references: [users.id]
	}),
}));

export const competencyCategoriesRelations = relations(competencyCategories, ({many}) => ({
	competencies: many(competencies),
}));

export const quizResponsesRelations = relations(quizResponses, ({one}) => ({
	user: one(users, {
		fields: [quizResponses.userId],
		references: [users.id]
	}),
	sectionQuizz: one(sectionQuizzes, {
		fields: [quizResponses.quizId],
		references: [sectionQuizzes.id]
	}),
}));

export const sectionContentsRelations = relations(sectionContents, ({one}) => ({
	courseSection: one(courseSections, {
		fields: [sectionContents.sectionId],
		references: [courseSections.id]
	}),
}));

export const courseProgressRelations = relations(courseProgress, ({one}) => ({
	user: one(users, {
		fields: [courseProgress.userId],
		references: [users.id]
	}),
	course: one(courses, {
		fields: [courseProgress.courseId],
		references: [courses.id]
	}),
	courseSection: one(courseSections, {
		fields: [courseProgress.sectionId],
		references: [courseSections.id]
	}),
}));

export const assessmentRelations = relations(assessment, ({one}) => ({
	competency: one(competencies, {
		fields: [assessment.competencyId],
		references: [competencies.id]
	}),
}));