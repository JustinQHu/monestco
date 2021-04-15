import React, { useEffect, useState, useLayoutEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Grid from '@material-ui/core/Grid';
import { Link, useParams } from 'react-router-dom';
import '../../styles/Companies.css';
import DiversityImg from '../../assets/diversity.png';
import WorkerExploitImg from '../../assets/workerexploit.png';
import WasteImg from '../../assets/wastepollution.png';
import SustainableImg from '../../assets/sustainable.png';
import DropdownButton from '../../assets/dropdownbutton.png';
import NewsPlaceHolder from '../../assets/news.png';
import { makeStyles } from '@material-ui/core/styles';
import Modal, { ModalManager } from '@material-ui/core/Modal';
import ModalBody from '../ModalBody';
import InfoIcon from "@material-ui/icons/Info";
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import axios from 'axios';



import BrandBox from '../../assets/brand_box.svg';
import BrandLogo from '../../assets/brandBreakdown.svg';

const companyinfo = [
    {
    A_ID: 0,
    B_ID: 0,
    C_ID: 0,
    D_ID: 0,
    Category: "",
    Description: "",
    IndustryStandardsID: 0,
    Logo: 0,
    Name: "",
    SimilarCompany1: "",
    SimilarCompany2: "",
    SimilarCompany3: "",
    SimilarCompany4: "",
    Subsidiary: "",
    }
]

function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  
  function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 900,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

  function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}


function Company ({match, location})  {
        const {
            params: { companyName }
        } = match;
    
    const [showFact,setShowFact] = useState(false);
    

    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [showInfo, setShowInfo] = useState(false)
    const [companyDetails, setCompanyDetails] = React.useState(companyinfo);
    const {loading, setLoading} = useState(false);
    const [state, setState] = useState([])
    const [A, setA] = useState(0);
    const [B, setB] = useState(0);
    const [C, setC] = useState(0);
    const [D, setD] = useState(0);

    const handleCloseInfo = () => {
        setShowInfo(false)
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const toggleFact = ()=> {
        setShowFact(!showFact)
    }

    const fact = [
        {
            title:"Uniqlo appoints its first ever female CEO.",
            discription:"Maki Akaida, a 40-year-old group senior vice president at parent company Fast Retailing, assumed the role of CEO for Uniqlo's Japanese business in 2019. After joining Uniqlo in 2001.",
            citation: "https://asia.nikkei.com/Business-Companies-Uniqlo-appoints-first-female-CEO-for-its-Japan-business"
        },
        {
            title:"Shifting to LED store lighting.",
            discription:"Maki Akaida, a 40-year-old group senior vice president at parent company Fast Retailing, assumed the role of CEO for Uniqlo's Japanese business in 2019. After joining Uniqlo in 2001.",
            citation: "https://asia.nikkei.com/Business-Companies-Uniqlo-appoints-first-female-CEO-for-its-Japan-business"
        },
        {
            title:"Recycled down is the future of Uniqlo’s collection.",
            discription:"Maki Akaida, a 40-year-old group senior vice president at parent company Fast Retailing, assumed the role of CEO for Uniqlo's Japanese business in 2019. After joining Uniqlo in 2001.",
            citation: "https://asia.nikkei.com/Business-Companies-Uniqlo-appoints-first-female-CEO-for-its-Japan-business"
        },
        {
            title:"Uniqlo provides resources for workers in Bangladesh.",
            discription:"Maki Akaida, a 40-year-old group senior vice president at parent company Fast Retailing, assumed the role of CEO for Uniqlo's Japanese business in 2019. After joining Uniqlo in 2001.",
            citation: "https://asia.nikkei.com/Business-Companies-Uniqlo-appoints-first-female-CEO-for-its-Japan-business"
        }
    ];
    

    const body = (
          <ModalBody handleClose={handleClose}/>
      );

    const Popup = ({handleCloseInfo}) => {

        return (
            <div className="company-popup">
                <div className='company-popup-content'>
                    <div style={{display:'flex', flexDirection:'column', marginTop:'1rem'}}>
                        <div>Brand Performance</div>
                        <div style={{fontSize:'16px', fontWeight:'500'}}>
                            Mobile Vulputate sit condimentum nulla eget placerat tincidunt.
                        </div>
                    </div>
                    <HighlightOffRoundedIcon onClick={handleCloseInfo} className="popup-close-icon"/>
                </div>
            </div>
        )
    };

    const RenderFact = ({item}) => {
        const [showFact, setShowFact] = useState(false);
        const [showCitation, setShowCitation] = useState(false);

        useEffect(() => {
            if(showFact === false) {
                setShowCitation(false)
            }
        }, [showFact])
        
        return(
            <div>
                <div className = 'Fun-Fact'>{item.title}
                    <div
                        className={showFact ? "Fun-Fact-circle-close" : "Fun-Fact-circle"}
                        onClick={() => setShowFact(!showFact)}
                        >
                        <i className={showFact ? "Fun-Fact-arrowdown-close" : "Fun-Fact-arrowdown"}></i>
                    </div>
                </div>
                {
                    showFact ? 
                        <div className = 'Fun-Fact-Dropdown'>
                            {item.discription}
                            <div className = 'Fun-Fact-Citation' style={{width:'100%', fontWeight:'700'}}>
                                Citation
                                <i onClick={() => setShowCitation(!showCitation)} style={{borderColor:'#323232'}} className={showCitation ? "Fun-Fact-arrowdown-close" : "Fun-Fact-arrowdown"}></i>
                            </div>
                            {
                                showCitation ? <div>{item.citation}</div> : null
                            }
                        </div> : null
                }
                <div className = 'FunFact-Decorative-Line'></div>
            </div>
        )

    }

    const RenderInfo = () => {

        const [tabView, setTabView] = useState(window.innerWidth < 800);
        
        useLayoutEffect(() => {
            function updateSize() {
              if (window.innerWidth > 800) {
                setTabView(false);
              } else {
                setTabView(true);
              }
            }
            window.addEventListener("resize", updateSize);
            updateSize();
            return () => window.removeEventListener("resize", updateSize);
          }, []);

        if(!tabView) { //web view
            return(
                <div className='brand_info-text'>Vulputate sit condimentum nulla eget placerat tincidunt.</div>
                )
        } else if ( showInfo && tabView ) { //tab view
            return(
                    <Popup handleCloseInfo={handleCloseInfo} />
                )
        } else return null

    }

    const newsDiscriptionTitle = "Nike allegedly discriminates against women at its corporate headquarters";
    const newsDiscriptionInfo = "Fed up with feeling marginalized working at the Nike headquarters, a group of female employees began secretly surveying their coworkers on their experiences with gender discrimination....";

    useEffect(() => {
        // setLoading(true);
        // let data = companyDetails;
        axios.post(
            '/companyname', 
            {},
                {
                    params: companyName
                }
            )
            .then((resp) => {
                let data = companyDetails;
                data[0]["A_ID"] = resp.data[0]["AID"];
                data[0]["B_ID"] = resp.data[0]["BID"];
                data[0]["C_ID"] = resp.data[0]["CID"];
                data[0]["D_ID"] = resp.data[0]["DID"];
                data[0]["Category"] = resp.data[0]["Category"];
                data[0]["Description"] = resp.data[0]["Description"];
                data[0]["IndustryStandardsID"] = resp.data[0]["IndustryStandardsID"];
                data[0]["Logo"] = resp.data[0]["Logo"];
                data[0]["Name"] = resp.data[0]["Name"];
                data[0]["SimilarCompany1"] = resp.data[0]["SimilarCompany1"];
                data[0]["SimilarCompany2"] = resp.data[0]["SimilarCompany2"];
                data[0]["SimilarCompany3"] = resp.data[0]["SimilarCompany3"];
                data[0]["SimilarCompany4"] = resp.data[0]["SimilarCompany4"];
                data[0]["Subsidiary"] = resp.data[0]["Subsidiary"];
                setCompanyDetails(data);
                setState(resp.data);
            })

            axios.post(
                '/companydetailsA_specific', 
                {},
                    {
                        params: companyName
                    }
                )
                .then((resp) => {
                    // console.log(resp.data);
                    // let data = A;
                    // data[0]["A"] = resp.data[0]["A"];
                    // setA(A);
                    // console.log(A);
                })   
    });

    return(
        <div className = 'Layout'>
        <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
                <div className = 'Left-Menu'>                
                    <div>
                        <h1>{companyName}</h1>
                        <img className='brand-logo' src={`${companyDetails[0]["Logo"]}`} alt={`${companyDetails[0]["Logo"]}`} />
                        <div style={{fontSize:'14px', fontWeight:'500', color:'#797979', margin:'10px 0'}}>Subsidiary of {companyDetails[0]["Subsidiary"]}</div>
                        <p style={{marginTop:"5%", color: '#4F4F4F'}}><b>{companyName}</b> {companyDetails[0]["Description"]}</p>
                    </div>
                    <div>
                        <img src={BrandBox} style={{width:"90%",}}/>
                        <div className="brand_inside_text">
                            <span className='navy'>48</span>
                            <span>/154</span>
                        </div>
                        <Link className='breakDown-link'>Detailed Breakdown</Link>
                    </div>
                </div>
            </Grid>
            <Grid item xs={12} md={8}>
                <div className = 'Right-Menu' style={{marginTop: '7%', marginLeft: '0.5rem'}}>
                    <div className = 'Brand-Section-title'>
                        Brand Performance 
                        <InfoIcon className='brand_info-icon' onClick={() => setShowInfo(!showInfo)} />
                        <RenderInfo />
                    </div>
                    <div className = 'Decorative-Line'></div>
                
                    <div className = 'Brand-Performance'>
                            <div className = 'Brand-Performance-container'>
                                <div>
                                    DIVERSITY & INCLUSION
                                    <div className = 'Description'>
                                        <div className='Description-text'>
                                            Discrimination, Gender Equality, Culture Diversity, Inclusivity
                                        </div>
                                        <div className='Description-data'>
                                        <img src = {DiversityImg}/>
                                        <div className="Description-score"><span>5.5</span><span>/22</span></div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    WORKER EXPLOITATION
                                    <div className = 'Description'>
                                        <div className='Description-text'>
                                            Discrimination, Gender Equality, Culture Diversity, Inclusivity
                                        </div>
                                        <div className='Description-data'>
                                        <img src = {WorkerExploitImg}/>
                                        <div className="Description-score"><span>19.5</span><span>/46</span></div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    WASTE & POLLUTION
                                    <div className = 'Description'>
                                        <div className='Description-text'>
                                            Discrimination, Gender Equality, Culture Diversity, Inclusivity
                                        </div>
                                        <div className='Description-data'>
                                        <img src = {WasteImg}/>
                                        <div className="Description-score"><span>9</span><span>/52</span></div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    ETHICAL SOURCING
                                    <div className = 'Description'>
                                        <div className='Description-text'>
                                            Discrimination, Gender Equality, Culture Diversity, Inclusivity
                                        </div>
                                        <div className='Description-data'>
                                        <img src = {SustainableImg}/>
                                        <div className="Description-score"><span>14</span><span>/34</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                    <div className = 'Brand-Section-title'>
                        Company Initiaitves 
                        <InfoIcon className='brand_info-icon' onClick={() => setShowInfo(!showInfo)} />
                        <RenderInfo />
                    </div>
                    <div className = 'Decorative-Line'></div>
                    {
                        fact.map((item, index) => <RenderFact key={index} item={item} />)
                    }
                    
                    <div className = 'In-The-News'>
                        <div className = 'Brand-Section-title'>In The News</div>
                        <div className = 'Decorative-Line'></div>
                            <div className='In-The-News-container'>
                                <div className='news-card'>
                                    <img style={{background:`url: ${NewsPlaceHolder} rgba(87, 114, 104, 0.5)`}} onClick={handleOpen}/>
                                    <div className='news-category'>
                                        <span className='news-category-title'>Worker Exploitation</span>
                                        <span className='news-category-year'>2018</span>
                                    </div>
                                    <div style={{marginTop: '3%'}} className = 'News-Description'>
                                        <div className = 'News-Description-title'>{newsDiscriptionTitle}</div>
                                        <div className = 'News-Description-info'>{newsDiscriptionInfo}</div>
                                        <div style={{fontSize:'14px'}}>
                                            <span>Responsibility Taken?</span>
                                            <span style={{color:'#E94921', marginLeft:'5px'}}>No</span>
                                        </div>
                                        <div style={{fontSize:'14px', display:'flex', position:'relative'}}>
                                            <span>Issue Addressed?</span>
                                            <span style={{color:'#28a745', marginLeft:'5px'}}>Yes</span>
                                            <button className='News-read-more-btn'>read more</button>
                                        </div>
                                    </div>
                                </div>
                                <div className='news-card'>
                                    <img style={{background:`url: ${NewsPlaceHolder} rgba(87, 114, 104, 0.5)`}} onClick={handleOpen}/>
                                    <div className='news-category'>
                                        <span className='news-category-title'>Worker Exploitation</span>
                                        <span className='news-category-year'>2018</span>
                                    </div>
                                    <div style={{marginTop: '3%'}} className = 'News-Description'>
                                        <div className = 'News-Description-title'>{newsDiscriptionTitle}</div>
                                        <div className = 'News-Description-info'>{newsDiscriptionInfo}</div>
                                        <div style={{fontSize:'14px'}}>
                                            <span>Responsibility Taken?</span>
                                            <span style={{color:'#E94921', marginLeft:'5px'}}>No</span>
                                        </div>
                                        <div style={{fontSize:'14px', display:'flex', position:'relative'}}>
                                            <span>Issue Addressed?</span>
                                            <span style={{color:'#28a745', marginLeft:'5px'}}>Yes</span>
                                            <button className='News-read-more-btn'>read more</button>
                                        </div>
                                    </div>
                                </div>                            
                                <div className='news-card'>
                                    <img style={{background:`url: ${NewsPlaceHolder} rgba(87, 114, 104, 0.5)`}} onClick={handleOpen}/>
                                    <div className='news-category'>
                                        <span className='news-category-title'>Worker Exploitation</span>
                                        <span className='news-category-year'>2018</span>
                                    </div>
                                    <div style={{marginTop: '3%'}} className = 'News-Description'>
                                        <div className = 'News-Description-title'>{newsDiscriptionTitle}</div>
                                        <div className = 'News-Description-info'>{newsDiscriptionInfo}</div>
                                        <div style={{fontSize:'14px'}}>
                                            <span>Responsibility Taken?</span>
                                            <span style={{color:'#E94921', marginLeft:'5px'}}>No</span>
                                        </div>
                                        <div style={{fontSize:'14px', display:'flex', position:'relative'}}>
                                            <span>Issue Addressed?</span>
                                            <span style={{color:'#28a745', marginLeft:'5px'}}>Yes</span>
                                            <button className='News-read-more-btn'>read more</button>
                                        </div>
                                    </div>
                                </div>
                                <div className='news-card'>
                                    <img style={{background:`url: ${NewsPlaceHolder}`}} onClick={handleOpen}/>
                                    <div className='news-category'>
                                        <span className='news-category-title'>Worker Exploitation</span>
                                        <span className='news-category-year'>2018</span>
                                    </div>
                                    <div style={{marginTop: '3%'}} className = 'News-Description'>
                                        <div className = 'News-Description-title'>{newsDiscriptionTitle}</div>
                                        <div className = 'News-Description-info'>{newsDiscriptionInfo}</div>
                                        <div style={{fontSize:'14px'}}>
                                            <span>Responsibility Taken?</span>
                                            <span style={{color:'#E94921', marginLeft:'5px'}}>No</span>
                                        </div>
                                        <div style={{fontSize:'14px', display:'flex', position:'relative'}}>
                                            <span>Issue Addressed?</span>
                                            <span style={{color:'#28a745', marginLeft:'5px'}}>Yes</span>
                                            <button className='News-read-more-btn'>read more</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="simple-modal-title"
                                aria-describedby="simple-modal-description"
                            >
                                {body}
                            </Modal>
                    </div>
                    <div className="similar_brands">
                        <div className = 'Brand-Section-title'>Similar Brands</div>
                        <div className = 'Decorative-Line'></div>
                        <div className="similar_brands-container"> 
                            <div>
                                <div>NIKE</div>
                                <div className='brand_box'>
                                    <div className="d-flex justify-content-center">
                                        <img src={BrandBox} className="brand_logo"/>
                                    </div>
                                    <div className="brand_inside_text ml-10perc">
                                        <span>50</span>
                                        <span>/154</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div>Champion</div>
                                <div className='brand_box'>
                                    <div className="d-flex justify-content-center">
                                        <img src={BrandBox} className="brand_logo"/>
                                    </div>
                                    <div className="brand_inside_text ml-10perc">
                                        <span>42</span>
                                        <span>/154</span>
                                    </div>
                                </div>
                            </div>                        
                            <div>
                                <div>ALDO</div>
                                <div className='brand_box'>
                                    <div className="d-flex justify-content-center">
                                        <img src={BrandBox} className="brand_logo"/>
                                    </div>
                                    <div className="brand_inside_text ml-10perc">
                                        <span>42</span>
                                        <span>/154</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div>Sem id mauris</div>
                                <div className='brand_box'>
                                    <div className="d-flex justify-content-center">
                                        <img src={BrandBox} className="brand_logo"/>
                                    </div>
                                    <div className="brand_inside_text ml-10perc">
                                        <span>48</span>
                                        <span>/154</span>
                                    </div>
                                </div>
                            </div>                            
                        </div>
                    </div>
            </div>
            </Grid>
        </Grid>
    </div>
    );
    }
// }

export default Company;
