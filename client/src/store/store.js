import Vue from "vue";
import Vuex from "vuex";

// components
import MainView from "./../components/MainView.vue";
import Course from "./../components/Course.vue";
import Forum from "./../components/Forum.vue";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        user: {
            _id: "",
            name: "",
            thumnail: "",
            role: "",
            roleIndex: -1,
            enrollment: []
        },
        lecturers: [],
        coursesForLecture: [],
        courses: [],
        currentSelectedCourse: {},
        currentSelectedForum: {},
        currentView: null,
        forums: [],
        MainView: MainView,
        Course: Course,
        Forum: Forum,
        needRefresh: true
    },
    mutations: {
        switchView(state, payload) {
            state.needRefresh = payload.needRefresh;
            state.currentView = payload.view;
        },
        changeCurrentSelectedCourse(state, course) {
            state.currentSelectedCourse = course;
        },
        changeCurrentSelectedForum(state, forum) {
            state.currentSelectedForum = forum;
        },
        saveForumList(state, forums) {
            state.forums = forums;
        }
    },
    actions: {
        getUserData({ state }) {
            return new Promise((resolve, reject) => {
                Vue.http.get("/auth/user").then(data => {
                    let user = {};
                    user._id = data.body._id;
                    user.name = data.body.name;
                    user.thumnail = data.body.thumnail;
                    user.roleIndex = data.body.role;
                    user.favorites = data.body.favorites;
                    user.enrollment = data.body.enrollment;
                    switch (data.body.role) {
                        case 0:
                            user.role = "Administrator";
                            break;

                        case 1:
                            user.role = "Lecturer";
                            break;

                        case 2:
                            user.role = "Student";
                            break;
                    }

                    state.user = user;
                    resolve();
                });
            });
        },
        getCourses({ state }) {
            return new Promise((resolve, reject) => {
                Vue.http
                    .get("/courses/all")
                    .then(data => {
                        return data.json();
                    })
                    .then(data => {
                        let coursesArray = [];
                        for (let key in data) {
                            if (state.user.roleIndex != 0) {
                                data[key].isJoined = state.user.enrollment.find(c => { return c._id == data[key]._id; });
                            }
                            coursesArray.push(data[key]);
                        }
                        state.courses = coursesArray;

                        // if (state.user.enrollment.length != 0) {
                        //     let ids = state.user.enrollment.join("|");
                        //     let regex = new RegExp(ids, "g");
                        //     state.enrollment = state.courses.filter(c => c._id.match(regex));
                        // } else {
                        //     state.enrollment = [];
                        // }
                        resolve();
                    });
            });
        },
        getCoursesForLecture({ state }) {
            return new Promise((resolve, reject) => {
                Vue.http.get(`/courses/all/lecture/${state.user._id}`).then(data => {
                    return data.json();
                }).then(data => {
                    state.coursesForLecture = data;
                    resolve();
                });
            });
        },
        getAllLecturers({ state }) {
            return new Promise((resolve, reject) => {
                Vue.http.get("/users/lecturers").then(data => {
                    return data.json();
                }).then(data => {
                    state.lecturers = data;
                    resolve();
                });
            });
        }
    }
});