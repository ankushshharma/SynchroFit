import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemText, ListItemIcon } from '@mui/material'; // Import Material-UI components
import MenuIcon from '@mui/icons-material/Menu'; // Import Material-UI icons
import SettingsIcon from '@mui/icons-material/Settings'; // Import Material-UI icons
import { Dumbbell } from 'lucide-react'; // Update this import
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import FitnessLanding from '../Pages/FitnessLanding';
import { useLoading } from '../../context/LoadingContext';
import CloseIcon from '@mui/icons-material/Close';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import HomeIcon from '@mui/icons-material/Home';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'; // Dumbbell icon
import FeedbackIcon from '@mui/icons-material/Feedback';
import InfoIcon from '@mui/icons-material/Info'; // Add this import at the top

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);    
    const [anchorEl, setAnchorEl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { setIsPageLoading, isPageLoading } = useLoading();

    const toggleMenu = () => {
        console.log('Menu toggled:', !isMenuOpen);
        setIsMenuOpen(!isMenuOpen);
    };
    const handleSettingsClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleSettingsClose = () => {
        setAnchorEl(null);
    };

    const handleTitleClick = (e) => {
        e.preventDefault();
        
        if (setIsPageLoading) {
            setIsPageLoading(true);
        }
        
        // Navigate to home page
        navigate('/', { replace: true });
        
        // Scroll to top
        window.scrollTo(0, 0);
        
        // Reset loading state if it exists
        if (setIsPageLoading) {
            setTimeout(() => {
                setIsPageLoading(false);
            }, 300);
        }
    };

    const handleAboutClick = () => {
        const currentPath = window.location.pathname;
        if (currentPath === '/about') {
            navigate('/');
        } else {
            navigate('/about');
            window.scrollTo(0, 0);
        }
    };

    console.log('Current menu state:', isMenuOpen);

    return (
        <>
            <style>
                {`@import url('https://fonts.googleapis.com/css2?family=Copperplate+Gothic&display=swap');`}
            </style>
            <AppBar position="fixed" className="navbar">
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        gap: '8px',
                        width: 'auto'
                    }}>
                        <IconButton 
                            edge="start" 
                            className="navbar-icon"
                            onClick={toggleMenu}
                            size="large"
                            disableRipple
                            sx={{ 
                                color: '#1976d2',
                                '& .MuiSvgIcon-root': {
                                    color: '#1976d2'
                                },
                                '&:focus': {
                                    outline: 'none',
                                    backgroundColor: 'transparent',
                                },
                                '&:active': {
                                    backgroundColor: 'transparent',
                                },
                                zIndex: 2,
                                position: 'relative'
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        
                        <Typography 
                            variant="h6" 
                            className="navbar-title"
                            style={{ 
                                fontFamily: 'Poppins, sans-serif',
                                width: 'auto'
                            }}
                        >
                            <Link 
                                to="/" 
                                onClick={handleTitleClick}
                                style={{ 
                                    textDecoration: 'none', 
                                    color: 'inherit',
                                    opacity: isLoading ? 0.7 : 1,
                                    transition: 'opacity 0.3s ease',
                                    display: 'block',
                                    width: 'auto'
                                }}
                            >
                                <div className="flex items-center justify-center" style={{ width: '100%' }}>
                                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 
                                         bg-clip-text text-transparent relative" style={{ display: 'inline-block' }}>
                                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent" 
                                            style={{ 
                                                fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
                                                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)'
                                            }}>
                                            Synchro
                                        </span>
                                        <span style={{ 
                                            color: 'black', 
                                            fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
                                            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)'
                                        }}>FIT</span>
                                    </span>
                                </div>
                            </Link>
                        </Typography>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton
                            onClick={handleAboutClick}
                            sx={{ 
                                color: 'transparent',
                                '&:hover': { 
                                    backgroundColor: 'rgba(25, 118, 210, 0.1)'
                                },
                            }}
                        >
                            <InfoIcon sx={{ color: '#1976d2' }} />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>

            <Drawer
                anchor="left"
                open={isMenuOpen}
                onClose={toggleMenu}
                PaperProps={{
                    sx: {
                        backgroundColor: '#ffffff',
                        width: 280,
                        padding: '24px 0',
                        display: 'flex',
                        flexDirection: 'column',
                        boxShadow: '0 0 20px rgba(0,0,0,0.1)',
                    }
                }}
            >
                <div style={{ 
                    padding: '0 24px 20px', 
                    color: '#1976d2',
                    borderBottom: '1px solid #eaeaea',
                    marginBottom: '12px'
                }}>
                    <h2 style={{
                        fontSize: '1.5rem',
                        fontWeight: '600',
                        margin: '0 0 4px 0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        color: '#1976d2'
                    }}>
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Navigation
                        </span>
                        <IconButton 
                            onClick={toggleMenu}
                            size="small"
                            sx={{ 
                                position: 'absolute',
                                top: '30px',
                                right: '10px',
                                color: '#0000FF',
                                '&:hover': { 
                                    backgroundColor: '#f5f5f5',
                                },
                                '& .MuiSvgIcon-root': {
                                    background: 'linear-gradient(to right, #1976d2, #9c27b0)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }
                            }}
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </h2>
                </div>

                <List sx={{ 
                    flex: 1,
                    padding: '0 12px',
                }}>
                    <ListItem 
                        button 
                        component={Link} 
                        to="/" 
                        onClick={() => {
                            toggleMenu();
                            window.scrollTo(0, 0);
                        }}
                        sx={{ 
                            '&:hover': { 
                                backgroundColor: '#f0f7ff',
                                '& .MuiListItemIcon-root': {
                                    color: '#1976d2'
                                }
                            },
                            padding: '12px 16px',
                            borderRadius: '12px',
                            margin: '4px 0',
                            transition: 'all 0.2s ease',
                            color: '#1976d2',
                            '& .MuiListItemText-primary': {
                                background: 'linear-gradient(to right, #1976d2, #9c27b0)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }
                        }}
                    >
                        <ListItemIcon sx={{ minWidth: '40px', color: '#1976d2' }}>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText 
                            primary="Home Page" 
                        />
                    </ListItem>
                    <ListItem 
                        button 
                        component={Link} 
                        to="/form" 
                        onClick={() => {
                            toggleMenu();
                            window.scrollTo(0, 0);
                        }}
                        sx={{ 
                            '&:hover': { 
                                backgroundColor: '#f0f7ff',
                                '& .MuiListItemIcon-root': {
                                    color: '#1976d2'
                                }
                            },
                            padding: '12px 16px',
                            borderRadius: '12px',
                            margin: '4px 0',
                            transition: 'all 0.2s ease',
                            color: '#1976d2',
                            '& .MuiListItemText-primary': {
                                background: 'linear-gradient(to right, #1976d2, #9c27b0)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }
                        }}
                    >
                        <ListItemIcon sx={{ minWidth: '40px', color: '#1976d2' }}>
                            <FitnessCenterIcon />
                        </ListItemIcon>
                        <ListItemText 
                            primary="Workout Planner" 
                        />
                    </ListItem>
                    
                    <ListItem 
                        button 
                        component="a" 
                        href="https://docs.google.com/forms/d/e/1FAIpQLScwmrnKgsfn9VCO3MGtX8m_arn2Dzb9wZRZxpeAGMSfRPo5ew/viewform?usp=header" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={() => {
                            toggleMenu();
                            window.scrollTo(0, 0);
                        }}
                        sx={{ 
                            '&:hover': { 
                                backgroundColor: '#f0f7ff',
                                '& .MuiListItemIcon-root': {
                                    color: '#1976d2'
                                }
                            },
                            padding: '12px 16px',
                            borderRadius: '12px',
                            margin: '4px 0',
                            transition: 'all 0.2s ease',
                            color: '#1976d2',
                            '& .MuiListItemText-primary': {
                                background: 'linear-gradient(to right, #1976d2, #9c27b0)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }
                        }}
                    >
                        <ListItemIcon sx={{ minWidth: '40px', color: '#1976d2' }}>
                            <FeedbackIcon />
                        </ListItemIcon>
                        <ListItemText 
                            primary="Suggestions for us" 
                        />
                    </ListItem>
                </List>

                <div style={{ 
                    borderTop: '1px solid #eaeaea',
                    marginTop: 'auto',
                    padding: '20px 24px'
                }}>
                    <Link 
                        to="/about"
                        onClick={(e) => {
                            toggleMenu();
                            window.scrollTo(0, 0);
                        }}
                        style={{ 
                            textDecoration: 'none',
                            color: 'inherit',
                        }}
                    >
                        <Typography 
                            variant="subtitle2" 
                            sx={{ 
                                fontSize: '0.875rem',
                                fontWeight: '500',
                                marginBottom: '24px',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px',
                                background: 'linear-gradient(to right, #1976d2, #9c27b0)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            Learn more about us
                        </Typography>
                    </Link>
                    <Typography 
                        variant="subtitle2" 
                        sx={{ 
                            fontSize: '0.875rem',
                            fontWeight: '500',
                            marginBottom: '16px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            background: 'linear-gradient(to right, #1976d2, #9c27b0)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        Connect With Us
                    </Typography>
                    
                    <div style={{ 
                        display: 'flex', 
                        gap: '16px',
                    }}>
                        <IconButton
                            href="https://github.com/ankushshharmagh"
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{ 
                                '&:hover': { 
                                    backgroundColor: '#f5f5f5',
                                    color: '#008000',
                                },
                                transition: 'all 0.2s ease',
                                color: '#4682B4',
                            }}
                        >
                            <GitHubIcon />
                        </IconButton>
                        <IconButton
                            href="https://www.linkedin.com/in/ankushshharma/"
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{ 
                                '&:hover': { 
                                    backgroundColor: '#f5f5f5',
                                    color: '#00008B',
                                },
                                transition: 'all 0.2s ease',
                                color: '#4682B4',
                            }}
                        >
                            <LinkedInIcon />
                        </IconButton>
                        <IconButton
                            href="https://www.instagram.com/ankushshharma"
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{ 
                                '&:hover': { 
                                    backgroundColor: '#f5f5f5',
                                    color: '#FFC0CB',
                                },
                                transition: 'all 0.2s ease',
                                color: '#4682B4',
                            }}
                        >
                            <InstagramIcon />
                        </IconButton>
                    </div>
                </div>
            </Drawer>
        </>
    );
}

export default Navbar;