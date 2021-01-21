import './App.css';
import React from "react"
import Sidebar from "./components/sidebar"
import Chat from "./components/chat"
import { Helmet } from 'react-helmet'
import Pusher from "pusher-js"
import axios from "./Axios"
import { set } from 'mongoose';


  function App() {

    const [messages, setMessages] = useState([]);

    useEffect(() => {
       axios.get("/messages/sync")
       .then(response =>{
         
         setMessages(response.data)
       })
    }, [])

    console.log(messages)

    useEffect(() => {
      var pusher = new Pusher('c2ce299e506182667086', {
        cluster: 'mt1'
      });
  
      const channel = pusher.subscribe('messages');
      channel.bind('inserted', (data) => {
        setMessages([...messages, data])
      });
      return () =>  {
        channel.unbind_all();
        channel.unsubscribe();
      };
    }, [messages] )

  return (
    <div className = "header">
      <Helmet>
        <title> Whatsapp </title>
      </Helmet>
      
    <div className="app">
     
      <div className = "app_body">
        <Sidebar />
        <Chat messages = {messages}/>
        </div>      
    </div>
    </div>
  );
}


export default App;
