import { 
    NO_SEARCH_RESULTS, 
    TYPE_AHEAD_TEXT,
    ARTIST,
    ALBUM,
    SONG
} from '../Constants';
import {
    SearchFormProps
} from '../interfaces';




const SearchForm = (props: SearchFormProps): JSX.Element => {
    const { data, containerRef, query } = props;

    const getSingleDataDOM = ({ url, name, type }) => {
        if (name) {
          return (
            <div className="item-name">
              <a href={url} className="item-link">
                <div>{name}</div>
              </a>
              <div className={`meta-info ${type}`}>{type}</div>
            </div>
          )
        }
      }

      const resultsDOM = data?.map((item, i) => 
          <div key={i} className="list-item">
            {getSingleDataDOM({ url: item?.artistViewUrl, name: item?.artistName, type: ARTIST})}
            {getSingleDataDOM({ url: item?.collectionViewUrl, name: item?.collectionName, type: ALBUM })}
            {getSingleDataDOM({ url: item?.trackViewUrl, name: item?.trackName, type: SONG })}
        </div>
      );

    return (
        <>
            <div className="results-container" id="results" >
                { data?.length>0 ? 
                <>
                    <div>
                    {resultsDOM}
                    <div id="end-of-page" ref={containerRef}></div>
                    </div>
                </>
                : 
                <div>{query?.length ? NO_SEARCH_RESULTS : TYPE_AHEAD_TEXT}</div>}
            </div>
        </>
    );
}

export default SearchForm;