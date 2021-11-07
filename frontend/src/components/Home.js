import React, {useContext, useEffect, useState} from 'react'
import PoemScroll from './PoemScroll';
import Main from './Main'
import {myContext} from "../Context";
import {useAlert} from "react-alert";
import axios from "axios";
import configData from "../config.json";

export default function Home() {

    const [isLoading, setLoading] = useState(true);
    const [poemsByTags, setPoemsByTags] = useState([]);

    useEffect(() => {
        if (context) {
            axios.post(configData.SERVER_URL + "/poems/tags", {tags: context.tags})
                .then(res => {
                    console.log("Posting api/poems/tags to get the poems a user would be interested in.");
                    console.log(res.data);
                    setPoemsByTags(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                });
        }

    }, [])

    const poems = [];

    const alert = useAlert();

    const context = useContext(myContext);

    const [values, setValues] = useState({
        username: '',
        password: '',
    });

    const loginRoute = configData.SERVER_URL + '/authentication/login';
    const signupRoute = configData.SERVER_URL + '/authentication/register';

    const handleLogin = async (e) => {
        e.preventDefault();

        const { username, password } = values;
        const user = {username: username, password: password};

        axios.post(loginRoute, user, { withCredentials: true })
            .then(res => {
                if (res.data === "success") {
                    console.log("successful!");
                    window.location.href = "/";
                } else {
                    console.log(res);
                }
            }, () => {
                alert.show("Incorrect username or password");
                console.log("failure");
            })
            .catch(err => {
                //alert.show(err);
                console.error(err);
            });
    };

    const handleSignUp = async (e) => {
        e.preventDefault(); //prevents screen from reloading

        const { username, password } = values;
        const user = {username: username, password: password};

        if (!username || !password) {
            alert.show("Username and password must both be filled to signup!");
            return;
        }

        axios.post(signupRoute, user, { withCredentials: true })
            .then(res => {
                if (res.data.message === "success") {
                    console.log("successful!");
                    window.location.href = "/";
                } else if (res.data.message.includes("already exists")) {
                    alert.show("That username is already taken.");
                }
            })
            .catch(err => {
                //alert.show(err);
                console.error(err);
            });
    }

    const handleChange = name => e => {
        setValues({ ...values, [name]: e.target.value });
    };

    if (isLoading) {
        return (
            <div>
                { context ? (
                    <div className="self-start flex flex-col gap-4 shadow-md rounded font-bold p-4 bg-red-200">

                        <div className="text-5xl text-black text-bold">
                           Welcome, {context.username}
                        </div>
                        <div className="flex gap-4 p-4 bg-red-400 shadow-inner">
                            <div className="flex flex-col flex-1">
                                <div className="bg-blue-100 rounded p-2">
                                    Popular
                                </div>
                                <PoemScroll poems={poems}/>
                            </div>
                            <div className="flex flex-col flex-1">
                                <div className="bg-green-100 rounded p-2">
                                    Based on tags
                                </div>
                                <div>Loading Poems...</div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="shadow-inner flex p-4 gap-10 justify-between bg-red-200">
                        <div className="self-start flex flex-col gap-4 shadow-md rounded font-bold p-4 bg-red-400">
                            <h2>Login</h2>
                            <form className="flex flex-col gap-4">
                                <input className="rounded border border-white" type="username" placeholder="Name"
                                       onChange={handleChange('username')}/>
                                <input className="rounded" type="password" placeholder="Password"
                                       onChange={handleChange('password')}/>
                                <button onClick={handleSignUp} type='signup'
                                        className="bg-red-900 text-white rounded focus:outline-black">Sign Up
                                </button>
                                <button onClick={handleLogin} type='login' className="bg-red-900 text-white rounded focus:outline-black">
                                    Log In
                                </button>
                            </form>
                        </div>

                        <Main/>

                        <PoemScroll poems={poems}/>
                    </div>
                )
                }
            </div>
        )
    }

    return (
        <div>
            { context ? (
                <div className="self-start flex flex-col gap-4 shadow-md rounded font-bold p-4 bg-red-200">
                    Currently logged in as:
                    <div className="text-5xl text-black text-bold">
                        {context.username}
                    </div>
                    <div className="flex gap-4 p-4 bg-red-400 shadow-inner">
                        <div className="flex flex-col flex-1">
                            <div className="bg-blue-100 rounded p-2">
                                Popular
                            </div>
                            <PoemScroll poems={poems}/>
                        </div>
                        <div className="flex flex-col flex-1">
                            <div className="bg-green-100 rounded p-2">
                                Based on tags
                            </div>
                            <PoemScroll poems={poemsByTags}/>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="shadow-inner flex p-4 gap-10 justify-between bg-red-200">
                    <div className="self-start flex flex-col gap-4 shadow-md rounded font-bold p-4 bg-red-400">
                        <h2>Login</h2>
                        <form className="flex flex-col gap-4">
                            <input className="rounded border border-white" type="username" placeholder="Name"
                                   onChange={handleChange('username')}/>
                            <input className="rounded" type="password" placeholder="Password"
                                   onChange={handleChange('password')}/>
                            <button onClick={handleSignUp} type='signup'
                                    className="bg-red-900 text-white rounded focus:outline-black">Sign Up
                            </button>
                            <button onClick={handleLogin} type='login' className="bg-red-900 text-white rounded focus:outline-black">
                                Log In
                            </button>
                        </form>
                    </div>

                    <Main/>

                    <PoemScroll poems={poems}/>
                </div>
            )
            }
        </div>
    );
}
