//Function to convert any date time field in a friendly version i.e. '5 minutes ago'

function fnFriendlyTimeStamp(time) {
    // all time values are in miliseconds
    let createdDate = new Date(time);
    let timeDiff = Date.now() - createdDate; 
    let friendlyTimeStamp;

    // More than 10 days
    if (timeDiff > 864000000) { friendlyTimeStamp = `on ${props.memory.createdAt.slice(0, 10)}`;} 
    
    //2-10 days
    else if (timeDiff > 172800000) {friendlyTimeStamp = `${Math.floor(timeDiff / 86400000)} days ago`;} 
    
    //1 day (singular)
    else if (timeDiff > 86400000) {friendlyTimeStamp = `${Math.floor(timeDiff / 86400000)} day ago`;} 
    
    // 2-23 hours
    else if (timeDiff > 7200000) { friendlyTimeStamp = `${Math.floor(timeDiff / 3600000)} hours ago`;} 

    // 1 hour (singular)
    else if (timeDiff > 3600000) {friendlyTimeStamp = `${Math.floor(timeDiff / 3540000)} hour ago`;} 

    // 2-59 minutes
    else if (timeDiff > 120000) { friendlyTimeStamp = `${Math.floor(timeDiff / 60000)} minutes ago`;}

    //0-2 minutes
    else {friendlyTimeStamp = `just now`;}

    return friendlyTimeStamp
}


export { fnFriendlyTimeStamp };
