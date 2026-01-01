import './LikedThumbnail.css'
import type { FileInfo } from '../types/types';

interface LikedThumbnailProps{
  file: FileInfo,
  onSelectImg: (path: string) => void
}

//const FILETYPE_PICTURE = 'picture'
const FILETYPE_VIDEO = 'video'

const AccessPath = import.meta.env.VITE_API_BASE;
const thumbnailPath = "/thumbnails";

const LikedThumbnail: React.FC<LikedThumbnailProps> = ({file, onSelectImg}) => {
  return(
    <div className='thumbnail' key={file.fileName}>
      <img className='thumbnailImage'
            src={`${AccessPath}${thumbnailPath}${file.Reactions[0].target}${file.fileType === FILETYPE_VIDEO ? '.jpg' : ""}`}
            loading="lazy" 
            onClick={() => onSelectImg(file.Reactions[0].target)}/>
      <div className='reactionEmojiContainer'>
        {file.Reactions?.find(x => x.reactionType === "Like") ? <div>❤️</div> : false}
        {file.fileType === FILETYPE_VIDEO && <div>🎥</div>}
      </div>
    </div>
  )
}

export default LikedThumbnail;