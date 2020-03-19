import React from 'react';
import NavBar from './components/NavBar';
import Header from './components/Header';
import axios from 'axios';
import Chart from "react-google-charts";
import Loader from './components/Loader';

class App extends React.Component {
    state = { link: '', reviews: [], count: [], classes: [], loading: false, initial: true }
    handleAnalyzeClick = () => {
        const data = { link: this.state.link };
        this.setState({ loading: true, initial: false })
        axios.post('http://localhost:5000/getreviews', { data }).then(res => {
            if (res.status === 200) {
                console.log(res);
                this.setState({ reviews: res.data.reviews, count: res.data.count, classes: res.data.classes, loading: false });
            }
        }).catch(err => {
            console.log(err);
            window.alert(err);
            this.setState({ loading: false, initial: true });
        });

    }

    displayReviews = () => {
        return (this.state.reviews.map((review, index) => {
            return (
                <div className="item" key={index}>
                    <div className="right floated content">
                        <div className={`${this.state.classes[index] === 0 ? "negative" : "positive"} ui button`}>{`${this.state.classes[index] === 0 ? "Negative" : "Positive"}`}</div>
                    </div>
                    <div class="content">
                        {review}
                    </div>
                </div>
            );
        }))
    }

    displayContent = () => {

        if (this.state.initial) {
            return (
                <div className="ui container" style={{marginTop:'15px'}}>
                    <div className="ui message">
                        <div className="header">
                            Product Opinion Mining
                    </div>
                        <p>Just one step away! Copy the review link of the product you want to analyze and paste it above.</p>
                    </div>
                </div>
            );
        }

        if (this.state.loading) {
            return (
               <div className="ui container" style={{marginTop: '15px'}} >
                    <Loader />
               </div>
            );
        }

        return (
            <div>
                <div className="ui two column centered grid" style={{ marginTop: '10px' }}>
                    <div className="column">
                        <div className="ui statistics" style={{ marginTop: '85px', marginLeft: '70px' }}>
                            <div className="statistic">
                                <div className="value">
                                    {this.state.count.reviews}
                                </div>
                                <div className="label">
                                    Reviews
                                    </div>
                            </div>
                            <div className="statistic">
                                <div className="value">
                                    {this.state.count.positive}
                                </div>
                                <div className="label">
                                    Positive
                                    </div>
                            </div>
                            <div className="statistic">
                                <div className="value">
                                    {this.state.count.negative}
                                </div>
                                <div className="label">
                                    Negative
                                    </div>
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <Chart
                            width={'400px'}
                            height={'300px'}
                            chartType="PieChart"
                            loader={<div>Loading Chart</div>}
                            data={[
                                ['Class', 'Count'],
                                ['Positive', this.state.count.positive],
                                ['Negative', this.state.count.negative]
                            ]}
                            options={{
                                title: 'Review Analysis',
                                is3D: true,
                            }}
                            rootProps={{ 'data-testid': '2' }}
                        />
                    </div>
                </div>
                <div className="ui container">
                    <div class="ui middle aligned divided list">
                        {this.displayReviews()}
                    </div>
                </div>
            </div>
        );
    }
    render() {
        return (
            <div>
                <NavBar />
                <div >
                    <Header />
                    <div className="ui action input" style={{ marginLeft: '10px' }}>
                        <input type="text" placeholder="Product Link" value={this.state.link} onChange={e => this.setState({ link: e.target.value })} />
                        <div className="ui black button" onClick={this.handleAnalyzeClick}>Analyze</div>
                    </div>
                    {this.displayContent()}
                </div>
            </div>
        );
    }
}

export default App;