//css
import './Statistics.css';

//img
function Statistic() {
    return (
        <div className='main-statistic'>
            <div className='Admin-DashBoard-Main_Title'>
                <div className='Admin-DashBoard-Main_Title-Left'>
                    <h2 className='Admin-DashBoard-Main_Title-Left-Intro'>
                        Hi, welcome back!
                    </h2>
                    <p className='Admin-DashBoard-Main_Title-Left-text'>
                        Sales monitoring dashboard template.
                    </p>
                </div>
                <div className='Admin-DashBoard-Main_Title-Right'>
                    <label className='Admin-DashBoard-title-Star'>
                        Customer Ratings
                    </label>
                    <div className='Admin-DashBoard-Star'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='12'
                            height='16'
                            fill='#fbbc0b'
                            className='bi bi-star-fill'
                            viewBox='0 0 16 16'
                        >
                            <path d='M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z' />
                        </svg>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='12'
                            height='16'
                            fill='#fbbc0b'
                            className='bi bi-star-fill'
                            viewBox='0 0 16 16'
                        >
                            <path d='M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z' />
                        </svg>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='12'
                            height='16'
                            fill='#97a3b9'
                            className='bi bi-star-fill'
                            viewBox='0 0 16 16'
                        >
                            <path d='M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z' />
                        </svg>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='12'
                            height='16'
                            fill='#97a3b9'
                            className='bi bi-star-fill'
                            viewBox='0 0 16 16'
                        >
                            <path d='M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z' />
                        </svg>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='12'
                            height='16'
                            fill='#97a3b9'
                            className='bi bi-star-fill'
                            viewBox='0 0 16 16'
                        >
                            <path d='M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z' />
                        </svg>
                        <span>(14.000)</span>
                    </div>
                </div>
            </div>
            <div className='Admin-DashBoard-Main-ChooseDate'>
                <div className='Admin-DashBoard-Main-ChooseDate_Text'>
                    Choose Date:
                </div>
                <input
                    type='date'
                    id='Admin-DashBoard-start'
                    name='trip-start'
                    defaultValue='2022-07-22'
                    min='2018-01-01'
                    max='2026-12-31'
                />
            </div>

            <div className='Admin-DashBoard-Main-Header row'>
                <div className='Admin-DashBoard-Main-Header-Income col-md-3'>
                    <div className='Admin-DashBoard-Main-Header-Note'>
                        Daily income
                    </div>
                    <div className='Admin-DashBoard-Main-Header-Money'>
                        $5,678.90
                    </div>
                    <div className='Admin-DashBoard-Main-Header-Percent'>
                        +20% day over day
                    </div>
                </div>
                <div className='Admin-DashBoard-Main-Header-Income col-md-3'>
                    <div className='Admin-DashBoard-Main-Header-Note'>
                        Weekly income
                    </div>
                    <div className='Admin-DashBoard-Main-Header-Money'>
                        $45,678.90
                    </div>
                    <div className='Admin-DashBoard-Main-Header-Percent'>
                        +10% day over week
                    </div>
                </div>

                <div className='Admin-DashBoard-Main-Header-Income col-md-3'>
                    <div className='Admin-DashBoard-Main-Header-Note'>
                        Monthly income
                    </div>
                    <div className='Admin-DashBoard-Main-Header-Money'>
                        $230,678.90
                    </div>
                    <div className='Admin-DashBoard-Main-Header-Percent'>
                        +23% day over month
                    </div>
                </div>
                <div className='Admin-DashBoard-Main-Header-Income col-md-3'>
                    <div className='Admin-DashBoard-Main-Header-Note'> Total </div>
                    <div className='Admin-DashBoard-Main-Header-Money'>
                        $5,678.90
                    </div>
                    <div className='Admin-DashBoard-Main-Header-Percent'>
                        +20% day over day
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Statistic;
