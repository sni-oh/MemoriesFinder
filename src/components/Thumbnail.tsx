import './Thumbnail.css'
import type { FileInfo } from '../types/types';

interface ThumbnailProps{
  path: string,
  file: FileInfo,
  onSelectImg: (file: FileInfo | null, path: string) => void
}

//const FILETYPE_PICTURE = 'picture'
const FILETYPE_VIDEO = 'video'

const AccessPath = import.meta.env.VITE_API_BASE;
const thumbnailPath = "/thumbnails";

const Thumbnail: React.FC<ThumbnailProps> = ({path, file, onSelectImg}) => {
  return(
    <div className='thumbnail' key={file.fileName}>
      <img className='thumbnailImage'
            src={`${AccessPath}${thumbnailPath}${path}/${file.fileName}${file.fileType === FILETYPE_VIDEO ? '.jpg' : ""}`}
            loading="lazy" 
            onClick={() => onSelectImg(file, `${path}/${file.fileName}`)}/>
      <div className='reactionEmojiContainer'>
        {file.Reactions?.find(x => x.reactionType === "Like") ? <div>❤️</div> : false}
        {file.fileType === FILETYPE_VIDEO && <div>🎥</div>}
      </div>
    </div>
  )
}

export default Thumbnail;