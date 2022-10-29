import { Button } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";

function Home(){
    return(
        <div>
            <nav className="homeNav">
                <h1>Draw</h1>
                <Link to="/signup"><Button>Sign up</Button></Link>
            </nav>
            <div className="homeIntro">
                <h1>Put your ideas on paper and show others</h1>
                <p>Linez is a simple to use diagram tool. Sort out your thoughts and data by making diagrams. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque semper lacus odio, nec bibendum nisi pulvinar sit amet. Nunc gravida tempor massa ut fermentum. Phasellus lacinia volutpat elit at convallis. Quisque tincidunt commodo libero, eget tincidunt est malesuada id.</p>
                <Link to="/signup"><Button size="lg">Sign up free</Button></Link>
            </div>
            <div className="homeIntro">
                <p>Praesent aliquet vitae purus non tincidunt. Phasellus tempor laoreet urna, in molestie mauris luctus in. Donec sit amet tellus egestas, ornare purus quis, ornare felis. Cras a eros euismod, lacinia nibh sed, cursus ex. Proin quis turpis consectetur, hendrerit augue in, semper tellus. Vivamus tempor, odio at ullamcorper tempor, felis ex tempor nisl, quis mattis nisi massa ac dolor. Maecenas eget vulputate dolor. In felis nulla, aliquam non dictum quis, lacinia ut magna. Praesent facilisis sapien eu mauris volutpat tincidunt eget a sapien. Sed augue urna, pulvinar a est id, tincidunt posuere ipsum. Nunc dignissim volutpat faucibus. Maecenas malesuada enim est, eu suscipit purus rutrum vitae. Praesent interdum, odio id commodo sagittis, orci risus euismod nulla, eget auctor metus nulla sit amet turpis.</p>
            </div>
            <div className="homeIntro">
                <p>Proin quis ornare dui, eget dapibus magna. In sit amet porttitor tortor. Sed condimentum ante ex, id hendrerit turpis volutpat vitae. Duis quam mauris, fermentum id purus sit amet, ultricies iaculis urna. Sed in justo sed ipsum placerat tempor non at sapien. Nunc aliquam fermentum lobortis. Proin et lectus non diam sollicitudin dignissim nec at quam. Sed in ligula metus. Donec tincidunt hendrerit eros, elementum imperdiet massa pellentesque et. Fusce molestie maximus porttitor. Pellentesque dapibus, purus tincidunt vestibulum porta, ex lacus faucibus nibh, eu ullamcorper ligula nulla luctus justo. Morbi sollicitudin, metus ut gravida blandit, massa turpis aliquam odio, quis viverra purus urna a turpis. Suspendisse ac est quis libero accumsan suscipit.</p>
            </div>
            <Outlet />
        </div>
    );
}

export default Home;