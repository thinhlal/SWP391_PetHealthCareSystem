import './AdminRating.css';
// React
import React, { useState } from 'react';
// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

// Img
import logo_pet_health_care from '../../assets/images/img_AdminCages/logo_pethealthcare.png';
import icon_search from '../../assets/images/img_AdminCages/icon_search.svg';
import Statistic from '../../components/Admin/Statistics/Statistics';
import Sidebar from '../../components/Admin/Sidebar/Sidebar';

// MUI
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { green } from '@mui/material/colors';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';



function AdminRating() {
    const [search, setSearch] = useState('');
    const [ratingFilter, setratingFilter] = useState('All');

    // const openTab = tabName => setActiveTab(tabName);

    const [ratingData] = useState([
        {
            id: 1,
            rate_id: 'R00001',
            rate_start: '4',
            comment: 'Comment 1'

        },
        {
            id: 2,
            rate_id: 'R00002',
            rate_start: '5',
            comment: 'Comment 2'
        },
        {
            id: 3,
            rate_id: 'R00003',
            rate_start: '3',
            comment: 'Comment 3'
        },
        {
            id: 4,
            rate_id: 'R00004',
            rate_start: '2',
            comment: 'Comment 4'
        },
        {
            id: 5,
            rate_id: 'R00005',
            rate_start: '1',
            comment: 'Comment 5'
        },
    ]);


    const handleratingFilterChange = event => {
        setratingFilter(event.target.value);
    };

    const filteredratingData = ratingData.filter(rating => {
        const matchesStatus =
            ratingFilter === 'All' || rating.rate_start === ratingFilter;
        const matchesSearch =
            search === '' ||
            rating.rate_id.toLowerCase().includes(search.toLowerCase());
        return matchesStatus && matchesSearch;
    });



    return (
        <div className='Admin-Rating container-fluid'>
            <div className='row'>
                <div className='Admin-Rating-Header row'>
                    <div className='Admin-Rating-Header-Logo col-md-2'>
                        <img
                            className='Admin-Rating-Logo'
                            src={logo_pet_health_care}
                            alt='logo-pet'
                        />
                    </div>
                    <div className='Admin-Rating-Header-Account-Wrapper col-md-10'>
                        <div className='Admin-Rating-Header-Account'>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='20'
                                height='20'
                                fill='#000'
                                className='bi bi-person'
                                viewBox='0 0 16 16'
                            >
                                <path d='M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z' />
                            </svg>
                            <div className='Admin-Rating-Header-Account-Text'> Hi Admin</div>
                        </div>
                    </div>
                </div>

                <div className='Admin-Rating-Content row'>
                    <div className='Admin-Rating-Navigate col-md-2'>
                        <Sidebar />
                    </div>

                    <div className='Admin-Rating-Main col-md-10'>
                        <Statistic />
                        <div className='Admin-Rating-Main-Table-Wrapper'>
                            <div className='Admin-Rating-Main-Table'>
                                <div className='Admin-Rating-Main-Table-Title'> Rating List </div>
                                <div className='Admin-Rating-Main-Table-Title-Text'>
                                    {' '}
                                    Rating Information{' '}
                                </div>
                                <div className='Admin-Rating-Main-Filter'>
                                    <div className='Admin-Rating-Main-Search'>
                                        <input
                                            type='text'
                                            placeholder='Search rating ID'
                                            className='Admin-Rating-Main-Search-Input'
                                            onChange={e => setSearch(e.target.value)}
                                        />
                                        <button className='Admin-Rating-Main-Search-Button'>
                                            {' '}
                                            <img
                                                src={icon_search}
                                                alt=''
                                            />{' '}
                                        </button>
                                    </div>
                                    <div className='Admin-Rating-Select-Role'>
                                        <FilterAltIcon sx={{ fontSize: 20 }} />
                                        Select rating:
                                        <select
                                            className='Admin-Rating-Select-Filter'
                                            name='role'
                                            onChange={handleratingFilterChange}
                                            value={ratingFilter}
                                        >
                                            <option>All</option>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </select>
                                    </div>

                                </div>

                                <div className='Admin-Rating-Main-Table-Header'>
                                    <div className='Admin-Rating-Main-Table-Header-Title'>
                                        {' '}
                                        Rating ID{' '}
                                    </div>
                                    <div className='Admin-Rating-Main-Table-Header-Title'>
                                        {' '}
                                        Rate start{' '}
                                    </div>
                                    <div className='Admin-Rating-Main-Table-Header-Title'>
                                        {' '}
                                        Comment{' '}
                                    </div>
                                    <div className='Admin-Rating-Main-Table-Header-Title'>
                                        {' '}
                                        Action{' '}
                                    </div>
                                </div>

                                {filteredratingData.map(item => (
                                    <div
                                        className='Admin-Rating-Main-Table-Content-Row-Wrapper'
                                        key={item.id}
                                    >
                                        <div className='Admin-Rating-Main-Table-Content-Row'>
                                            {' '}
                                            {item.rate_id}{' '}
                                        </div>
                                        <div className='Admin-Rating-Main-Table-Content-Row'>
                                            {' '}
                                            {item.rate_start}{' '}
                                        </div>
                                        <div className='Admin-Rating-Main-Table-Content-Row'>
                                            {' '}
                                            {item.comment}{' '}
                                        </div>
                                    {/* More Action */}
                                        <div className='Admin-Rating-Main-Table-Content-Row-Action'>
                                            <span className='Admin-Rating-Main-Table-Content-Btn_Wrapper'>
                                                <button
                                                    type='button'
                                                    className='Admin-Rating-Main-Table-Content-Btn'
                                                    data-bs-toggle='modal'
                                                    data-bs-target='#Admin-DashBoard-exampleModal'
                                                    >
                                                    <MoreVertOutlinedIcon sx={{ color: green[400] }} />
                                                </button>
                                            </span>
                                        </div>

                                    </div>
                                ))}

                                <div className='Admin-Rating-Pagination'>
                                    <Stack spacing={2}>
                                        <Pagination count={10} />
                                    </Stack>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>



    );


}

export default AdminRating;