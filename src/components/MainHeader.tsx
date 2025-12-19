import { useState, useEffect } from 'react';
import React from 'react';

interface MainHeaderProps{
  headerState: number
}

const MainHeader: React.FC<MainHeaderProps> = ({headerState}) => {
  return <header>MemoriesFinder</header>
}

export default MainHeader;