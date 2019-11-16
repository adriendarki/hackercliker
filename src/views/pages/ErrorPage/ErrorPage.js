import React from "react";
// import "../../styles/index.scss"
import "./ErrorPage.scss";
import { Link } from "react-router-dom";


function ErrorPage() {

    return (
        <div className="ErrorPage">
            <div className="ErrorPage__overlay"></div>
            <div className="ErrorPage__terminal">
                <h1>Error <span className="ErrorPage__errorcode">404</span></h1>
                <p className="ErrorPage__output">The page you are looking for might have been removed, had its name changed or is temporarily unavailable.</p>
                <p className="ErrorPage__output">Please try to <Link to="/" class="ErrorPage__errorLink">go back</Link> or <Link to="/game" class="ErrorPage__errorLink">return to the homepage</Link>.</p>
                <pre><code className="ErrorPage__code">
                    <br/><span>&lt;!DOCTYPE html&gt;</span>
                    <br/><span>&lt;html&gt;</span>
                    <br/><span>  &lt;head&gt;</span>
                    <br/><span>    &lt;style&gt;</span>
                    <br/><span>    &#123; </span>
                    <br/><span>      everything:moneyable;</span>
                    <br/><span>    &#125; </span>
                    <br/><span>    &lt;/style&gt;</span>
                    <br/><span>  &lt;/html&gt;</span>
                    <br/><span>  &lt;body&gt;</span> 
                    <br/><span className="ErrorPage__theError">           ERROR 404!
                                FILE NOT FOUND!</span>
                    <br/><span className="ErrorPage__comment">        &lt;!--The file you are looking for, 
                    <br/>                    is not where you think it is.--&gt;</span>
                    <br/><span>  &lt;/body&gt;</span>
                    <br/><span>&lt;/html&gt;</span>
                </code></pre>
                    
                <p className="ErrorPage__output">Good luck.</p>
            </div>
        </div>
    );
}

export default ErrorPage;
