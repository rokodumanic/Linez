import {XIcon, PlusIcon, PencilIcon, EyeIcon, ShareAndroidIcon, BrowserIcon, ChevronLeftIcon, ChevronRightIcon, DependabotIcon} from '@primer/octicons-react';
import { Link } from 'react-router-dom';

function FullSideItems(){
    return(
        <div className="sideItemsContainer">
            <div className="alignIconToItemSide">
                <Link className="blackLink" to="/workspace">
                <PlusIcon size={24}/>
                <a className="sideBarItem" href="#new">New</a>
                </Link>
            </div>
            <div className="alignIconToItemSide">
                <PencilIcon size={24} />
                <a className="sideBarItem" href="#edit">Edit</a>
            </div>
            <div className="alignIconToItemSide">
                <EyeIcon size={24} />
                <a className="sideBarItem" href="#view">View</a>
            </div>
            <div className="alignIconToItemSide">
                <ShareAndroidIcon size={24} />
                <a className="sideBarItem" href="#share">Share</a>
            </div>
            <div className="alignIconToItemSide">
                <BrowserIcon size={24} />
                <a className="sideBarItem" href="#browse">Browse</a>
            </div>
        </div>
    )
}

export default FullSideItems;