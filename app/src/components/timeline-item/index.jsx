import './index.css'

export const TimelineItem = function (props) {
    console.log(props);
    return <div className='timeline__item'>
                    <p>ユーザ名:{props.username}</p>
                    <p>内容:{props.usercontent}</p>
                  </div>
}