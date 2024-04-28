import React from 'react';
import { Welcome } from './Welcome';
import {BrowsePage} from './Browse';
export function Home({loginClient,signUp,signOut,user}) {
    
    if(user>0){
        return <BrowsePage signOut={signOut}/>
    }else{
        return <Welcome loginClient={loginClient} signUp={signUp} />
    }
}

