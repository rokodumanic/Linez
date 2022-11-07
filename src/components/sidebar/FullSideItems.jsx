import {XIcon, PlusIcon, PencilIcon, EyeIcon, ShareAndroidIcon, BrowserIcon, ChevronLeftIcon, ChevronRightIcon, DependabotIcon} from '@primer/octicons-react';
import { Link } from 'react-router-dom';

function FullSideItems(){
    return(
        <div className="sideItemsContainer">
            <Link to="/workspace" className="alignIconToItemSide blackLink">
                <PlusIcon size={24}/>
                <p className="sideBarItem">New</p>
            </Link>
            <Link className="alignIconToItemSide blackLink">
                <PencilIcon size={24} />
                <p className="sideBarItem">Edit</p>
            </Link>
            <Link className="alignIconToItemSide blackLink">
                <EyeIcon size={24} />
                <p className="sideBarItem">View</p>
            </Link>
            <Link className="alignIconToItemSide blackLink">
                <ShareAndroidIcon size={24} />
                <p className="sideBarItem">Share</p>
            </Link>
            <Link className="alignIconToItemSide blackLink">
                <BrowserIcon size={24} />
                <p className="sideBarItem">Browse</p>
            </Link>
        </div>
    )
}

export default FullSideItems;