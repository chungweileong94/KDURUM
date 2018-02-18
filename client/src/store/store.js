import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        user: {
            name: "",
            thumnail: "",
            role: "",
            roleIndex: -1,
            enrollment: []
        },
        courses: [],
        enrollment: []
    },
    mutations: {
        getUserData: state => {
            Vue.http.get("/auth/user").then(data => {
                state.user.name = data.body.name;
                state.user.thumnail = data.body.thumnail;
                state.user.roleIndex = data.body.role;
                state.user.enrollment = data.body.enrollment;
                switch (data.body.role) {
                    case 0:
                        state.user.role = "Administrator";
                        break;

                    case 1:
                        state.user.role = "Lecture";
                        break;

                    case 2:
                        state.user.role = "Student";
                        break;
                }

                //refrehs enrollment list
                let ids = state.user.enrollment.join("|");
                let regex = new RegExp(ids, "g");
                state.enrollment = state.courses.filter(c => c._id.match(regex));
            });
        },
        getAllCourses: state => {
            Vue.http
                .get("/courses/all")
                .then(data => {
                    return data.json();
                })
                .then(data => {
                    let coursesArray = [];
                    for (let key in data) {
                        if (state.user.roleIndex != 0) {
                            data[key].isJoined = state.user.enrollment.includes(data[key]._id);
                        }
                        coursesArray.push(data[key]);
                    }
                    state.courses = coursesArray;

                    //refrehs enrollment list
                    let ids = state.user.enrollment.join("|");
                    let regex = new RegExp(ids, "g");
                    state.enrollment = state.courses.filter(c => c._id.match(regex));
                });
        }
    },
    actions: {
        getUserData: context => {
            context.commit("getUserData");
        },
        getAllCourses: context => {
            context.commit("getAllCourses");
        }
    }
});