import React, { Component } from 'react';

class DropdownMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  toggleDropdown = () => {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen
    }));
  };

  render() {
    const { isOpen } = this.state;

    const dropdownStyles = {
      position: 'relative',
      display: 'inline-block',
      margin: '20px'
    };

    const buttonStyles = {
      backgroundColor: '#3498db',
      color: '#fff',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer'
    };

    const menuStyles = {
      display: isOpen ? 'block' : 'none',
      position: 'absolute',
      backgroundColor: '#f9f9f9',
      minWidth: '120px',
      boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
      zIndex: '1',
      padding: '12px 16px',
      borderRadius: '4px',
      marginTop: '5px'
    };

    const menuItemStyles = {
      textDecoration: 'none',
      color: '#333',
      display: 'block',
      padding: '8px 0',
      cursor: 'pointer'
    };

    return (
      <div style={dropdownStyles}>
        <button onClick={this.toggleDropdown} style={buttonStyles}>
          Dropdown
        </button>
        <div style={menuStyles}>
          <a href="#home" style={menuItemStyles}>
            Option 1
          </a>
          <a href="#about" style={menuItemStyles}>
            Option 2
          </a>
          <a href="#contact" style={menuItemStyles}>
            Option 3
          </a>
        </div>
      </div>
    );
  }
}

export default DropdownMenu;
