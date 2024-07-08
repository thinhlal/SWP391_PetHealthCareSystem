//css
import './AdminChartStatistic.css';
//React
import React from 'react';
// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Bootstrap Bundle JS
import 'bootstrap/dist/js/bootstrap.bundle.min';
//Components
import Header from '../../components/Admin/Header/Header';
import Sidebar from '../../components/Admin/Sidebar/Sidebar';
//images
import Statistic from '../../components/Admin/Statistics/Statistics';
import RevenueLineChart from '../../components/Admin/RevenueLineChart/RevenueLineChart';
function AdminChartStatistic() {
  return (
    <div className='Admin-Statistic container-fluid'>
      <div className='row'>
        <Header />
        <div className='Admin-Statistic-Content row'>
          <div className='Admin-Statistic-Navigate col-md-2'>
            <Sidebar />
          </div>

          <div className='Admin-Statistic-Main col-md-10'>
            <Statistic />
            <div className='Admin-Statistic-Revenue'>
              <RevenueLineChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminChartStatistic;
