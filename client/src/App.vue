<template>
    <div>
        <app-header :user="user"></app-header>
        <!-- show the content only when user data is loaded -->
        <section class="container" style="margin-top: 70px;" v-if="user._id.trim().length!==0">
            <!-- <keep-alive>
                <transition name="fade"> -->
            <component :is="currentView"></component>
            <!-- </transition>
            </keep-alive> -->
        </section>

        <!--alert box-->
        <div class="alert-wrapper" v-if="alertState.isShow">
            <div class="alert alert-info col-md-6">
                <strong>{{ alertState.message }}</strong>
            </div>
        </div>

        <app-loading v-if="user._id.trim().length===0" style="height:100%; width:100%; z-index:100;"></app-loading>
    </div>
</template>

<script>
    import Header from "./components/Header.vue";
    import Loading from "./components/Loading.vue";

    export default {
        components: {
            "app-header": Header,
            "app-loading": Loading
        },
        methods: {
            init() {
                this.$store.commit("switchView", {
                    view: this.MainView,
                    needRefresh: true
                });
                this.$store.dispatch("getUserData").then(() => {
                    //if the user is lecture
                    if (this.$store.state.user.roleIndex === 1) {
                        this.$store.dispatch("getCoursesForLecture");
                    } else {
                        //if the user is admin
                        if (this.$store.state.user.roleIndex === 0) {
                            this.$store.dispatch("getAllLecturers");
                        }
                        this.$store.dispatch("getCourses");
                    }
                });
            }
        },
        created() {
            this.$http.get("/auth/check").then(data => {
                return data.json();
            }).then(res => {
                if (res) {
                    window.onbeforeunload = () => "Are you sure to leave?";
                    this.init();
                } else {
                    this.$root.currentRoute = "/login";
                    window.history.pushState(
                        null,
                        "KDURUM",
                        "/login"
                    );
                }
            });
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
            MainView() {
                return this.$store.state.MainView;
            },
            currentView() {
                return this.$store.state.currentView;
            },
            alertState() {
                return this.$store.state.alertState;
            }
        }
    };
</script>

<style>
    @keyframes intro {
        from {
            opacity: 0;
            zoom: 0;
        }
        to {
            opacity: 1;
            zoom: 1;
        }
    }

    .navbar-toggle {
        border: none;
    }

    .alert-wrapper {
        position: fixed;
        bottom: 0;
        width: 100%;
        padding: 8px;
    }

    .alert-wrapper .alert {
        -webkit-animation-name: intro;
        -moz-animation-name: intro;
        -o-animation-name: intro;
        animation-name: intro;

        -webkit-animation-duration: 0.2s;
        -moz-animation-duration: 0.2s;
        -o-animation-duration: 0.2s;
        animation-duration: 0.2s;
        float: none;
        margin: auto;
    }

    textarea.form-control {
        height: 400px;
    }
</style>


