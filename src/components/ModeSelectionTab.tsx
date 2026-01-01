import React, { useState } from 'react';
import './ModeSelectionTab.css'
//import 

interface ModeSelectionTabProps{
  changeMode: (mode: string) => void
}

const MODE_YM = "ByYM"
const MODE_LIKE = "Like"

const ModeSelectionTab: React.FC<ModeSelectionTabProps> = ({changeMode}) => {
  const [selectedMode, SetSelectedMode] = useState<string>("ByYM")

  const changeSelectedMode = (mode: string) => {
    SetSelectedMode(mode)
    changeMode(mode)
  }

  return (
    <>
      <div className='background'>
        <div className={`selectButton ${selectedMode === MODE_YM && 'selectedButton'}`} onClick={() => changeSelectedMode(MODE_YM)}><p>年月別</p></div>
        <div className={`selectButton ${selectedMode === MODE_LIKE && 'selectedButton'}`} onClick={() => changeSelectedMode(MODE_LIKE)}><p>いいね</p></div>
      </div>
    </>
  )
}

export default ModeSelectionTab;