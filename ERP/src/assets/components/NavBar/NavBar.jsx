import { NavLink  } from 'react-router-dom';


function NavBar() {

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">ERP Protal IIIT Bangalore</a>
        
        
        <div className="d-flex flex-row-reverse">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-nav">    
            <NavLink  className="nav-link" to="/login" activeClassName="active" >Login</NavLink >
            <NavLink  className="nav-link" to="/profile" activeClassName="active" >Profile</NavLink >
            <NavLink  className="nav-link" to="/coursesdetails" activeClassName="active" >Course Details</NavLink >
            <NavLink  className="nav-link" to="/logout" activeClassName="active" >Logout</NavLink >
          </div>
        </div>
      </div>
    </nav>
  )
}
export default NavBar;