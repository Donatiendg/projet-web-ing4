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
                colors:['rgb(0,227,71)', '#ff0000'],
                legend: {
                    show: false
                },
                title: {
                    show: false
                }
            },
        };
    }

    render() {
        return (
            <div id="chart">
                <h3>Win/loose</h3>
                <Chart options={this.state.options} series={[this.props.wins, this.props.looses]} type="pie" width={195} />
            </div>
        );
    }
}

export default ApexChart;