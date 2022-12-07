import React from "react";
import Chart from "react-apexcharts";

class ApexChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: {
                chart: {
                    type: 'pie',
                },
                labels: ['Win', 'Loose'],
                colors:['rgba(0,0,255,0.4)', '#ff0000'],
                legend: {
                    show: false
                }
            },
        };
    }

    render() {
        return (
            <div id="chart">
                <Chart options={this.state.options} series={[this.props.wins, this.props.looses]} type="pie" width={380} />
            </div>
        );
    }
}

export default ApexChart;