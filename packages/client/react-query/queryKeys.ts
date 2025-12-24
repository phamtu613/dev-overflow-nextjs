export const QUERY_KEYS = {
  USER_SESSION: ["userSession"],

  QUESTIONS_LIST: (filter?: string, searchQuery?: string) => [
    "questions",
    { filter, searchQuery },
  ],
  QUESTION_DETAIL: (id: string) => ["question", id],
  SAVED_QUESTIONS: ["savedQuestions"],

  USERS_LIST: (sort?: string) => ["users", { sort }],
  USER_PROFILE: (id: string) => ["user", id],

  JOBS_LIST: (filter?: any) => ["jobs", { filter }],

  TAGS_LIST: ["tags"],
  TAG_DETAIL: (id: string) => ["tag", id],
};
