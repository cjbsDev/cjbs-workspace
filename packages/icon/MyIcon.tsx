import React from 'react';
import IcoMoon, { IconProps } from 'react-icomoon';
import iconSet from './selection.json';

const MyIcon = (props: IconProps) => <IcoMoon iconSet={iconSet} {...props} />;

export default MyIcon;
