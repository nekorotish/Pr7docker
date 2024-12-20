import React from "react";
import {TabNavigation} from "./Screens/TabNavigation";
import "react-native-gesture-handler"
import {Provider} from "react-redux";
import store from "./redux/store";

export default function App() {
    return (
        <Provider store={store}>
            <TabNavigation/>
        </Provider>
    )
}


