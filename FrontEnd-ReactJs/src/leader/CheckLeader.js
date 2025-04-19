

function CheackLeader() {
  if (localStorage.getItem("Login") == "Leader") {
    return false ;
  }
  
  return true ; 
}


function CheackStudent() {
  if (localStorage.getItem("Login") == "Leader" ||localStorage.getItem("Login")=="Student" ) {
    return false ;
  }
  return true ; 
}



function CheackTeacher() {
  if (localStorage.getItem("Login") == "Leader" ||localStorage.getItem("Login")=="Teacher") {
    return false ;
  }
  return true ; 
}





function CheackAll() {
  if (localStorage.getItem("Login") == "Leader" ||localStorage.getItem("Login")=="Teacher" || localStorage.getItem("Login")=="Student" ) {
    return false ;
  }
  return true ; 
}


export {CheackStudent , CheackAll ,CheackTeacher }
export default CheackLeader ;