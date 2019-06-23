import React from 'react';

import './index.less'

export default function DefButton(props) {
    console.log(props);
    return <button className="def-button" {...props}/>;
}