import React from 'react';
import './Header.css';

function Header() {
    return (
        <div >
            <table cellSpacing="0" className="maket">
          <tr>
            <td className="leftcol">Figures</td>
            <td className="rightcol">Canvas</td>
          </tr>
          <tr>
            <td className="zone-2">

              <div className="rectangle" id="rectangle"></div>
              <div className="circle" id="circle"></div>

            </td>
            <td className="zone-1">

            </td>
          </tr>
        </table>
        </div>
    )

}
export default Header;