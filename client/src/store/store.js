import Vue from "vue";
import Vuex from "vuex";

// components
import MainView from "./../components/MainView.vue";
import CourseView from "./../components/CourseView.vue";
import ForumView from "./../components/ForumView.vue";

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
        courses: [],
        currentSelectedCourse: {},
        currentSelectedForum: {},
        currentView: null,
        MainView: MainView,
        CourseView: CourseView,
        ForumView: ForumView
    },
    mutations: {
        switchView(state, view) {
            state.currentView = view;
        },
        changeCurrentSelectedCourse(state, course) {
            state.currentSelectedCourse = course;
        },
        changeCurrentSelectectForum(state, forum) {
            state.currentSelectedForum = forum;
        }
    },
    actions: {
        getUserData({ state }) {
            return new Promise((resolve, reject) => {
                Vue.http.get("/auth/user").then(data => {
                    state.user._id = data.body._id;
                    state.user.name = data.body.name;
                    state.user.thumnail = data.body.thumnail;
                    state.user.roleIndex = data.body.role;
                    state.user.enrollment = data.body.enrollment;
                    switch (data.body.role) {
                        case 0:
                            state.user.role = "Administrator";
                            break;

                        case 1:
                            state.user.role = "Lecturer";
                            break;

                        case 2:
                            state.user.role = "Student";
                            break;
                    }
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
        getAllLecturers({ state }) {
            return new Promise((resolve, reject) => {
                Vue.http.get("/users/lecturers").then(data => {
                    return data.json();
                }).then(data => {
                    state.lecturers = data;
                });
            });
        }
    }
});