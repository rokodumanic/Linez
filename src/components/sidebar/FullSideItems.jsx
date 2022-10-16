import {XIcon, PlusIcon, PencilIcon, EyeIcon, ShareAndroidIcon, BrowserIcon, ChevronLeftIcon, ChevronRightIcon, DependabotIcon} from '@primer/octicons-react';

function FullSideItems(){
    return(
        <div className="sideItemsContainer">
            <div className="alignIconToItemSide">
                <PlusIcon size={24}/>
                <a className="sideBarItem" href="#new">New</a>
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