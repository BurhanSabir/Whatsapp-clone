import "./sidestyle.css";
import React from 'react';
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ChatIcon from '@material-ui/icons/Chat';
import { Avatar , IconButton } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import Sidebarchat from "./sidebarchat.js"

function SideBar() {
    return (
        <div className = "side_compo">
          <div className="side_header">
            <Avatar alt = "picture" src = "https://www.celebrityborn.com/admin/assets/images/people/5QprLeLyN8EqmF2wLkks_2018_02_12.jpg"/>
            <div className="side_headright">
              <IconButton>
                <DonutLargeIcon />
              </IconButton>
              
              <IconButton>
                <ChatIcon />
              </IconButton>
              
              <IconButton>
                <MoreVertIcon />
              </IconButton>
              </div>
              </div>  
              <div className = "side_searchcontainer">
                <div className="side_search">
                  <SearchIcon />
                  <input
                  type="text"
                  placeholder="Search or start new chat"
                  />
                </div>
              </div>

            <div className="side_chatcompo">
                <Sidebarchat />
                <Sidebarchat />
                <Sidebarchat />

            </div>

        </div>

    )
}
export default SideBar