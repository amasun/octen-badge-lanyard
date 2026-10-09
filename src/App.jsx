import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  RefreshCw, 
  PanelRightClose, 
  PanelRightOpen,
  Users,
  Sparkles
} from 'lucide-react';
import Lanyard from './components/Lanyard';
import { TEAM_MEMBERS } from './data/teamMembers';
import { createOctenStrapTexture } from './utils/badgeCanvas';
import './App.css';

export default function App() {
  // 1. Team member state
  const [selectedMember, setSelectedMember] = useState(TEAM_MEMBERS[0]);

  // 2. Exact Parameters from the Reference Image
  const [customFront, setCustomFront] = useState(null);
  const [customBack, setCustomBack] = useState(null);
  const [customBand, setCustomBand] = useState(null);
  const [frontTemplate, setFrontTemplate] = useState(true); // Fixed template: bg (#111111) + laser logo
  const [holoPreset, setHoloPreset] = useState('rainbow'); // HoloCard presets: 'rainbow' | 'swirl' | 'glitter' | 'shards' | 'bursts' | 'stars' | 'cosmos' | 'gold'
  const [holoIntensity, setHoloIntensity] = useState(0.9);
  const [holoFoilColor, setHoloFoilColor] = useState('#e2e6ec');

  const [imageFit, setImageFit] = useState('cover'); // 'cover' | 'contain'
  const [orientation, setOrientation] = useState('portrait'); // 'portrait' | 'landscape'
  const [finish, setFinish] = useState('glossy'); // 'glossy' | 'matte' | 'holographic' | 'metallic'

  const [metal, setMetal] = useState('silver'); // 'silver' | 'gold' | 'graphite'
  const [cardColor, setCardColor] = useState('#ffffff');
  const [plainBand, setPlainBand] = useState(false);

  const [strapColor, setStrapColor] = useState('#31b934');
  const [cornerRadius, setCornerRadius] = useState(0.3);
  const [anchor, setAnchor] = useState('center'); // 'left' | 'center' | 'right'

  const [size, setSize] = useState(0.5);
  const [strapLength, setStrapLength] = useState(0.3);
  const [strapWidth, setStrapWidth] = useState(0.8);

  const [gravity, setGravity] = useState(1);
  const [damping, setDamping] = useState(0.5);
  const [elasticity, setElasticity] = useState(0.5);

  const [breeze, setBreeze] = useState(0.5);
  const [interactive, setInteractive] = useState(true);
  const [intro, setIntro] = useState(true);

  // UI state
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [remountKey, setRemountKey] = useState(0);

  // Hidden File Inputs Refs
  const frontInputRef = useRef(null);
  const backInputRef = useRef(null);
  const bandInputRef = useRef(null);

  // Default Strap Texture with Octen logo
  const [defaultBandUrl, setDefaultBandUrl] = useState('');

  // Generate default branded strap with the Octen logo
  useEffect(() => {
    let active = true;
    async function loadStrap() {
      const strap = await createOctenStrapTexture({
        color: strapColor,
        logoUrl: '/brand/logo2.png'
      });
      if (active && strap) {
        setDefaultBandUrl(strap);
      }
    }
    loadStrap();
    return () => { active = false; };
  }, [strapColor]);

  // Resolve final images passed to <Lanyard /> (Raw Photo Mode by default)
  const finalFront = useMemo(() => {
    if (customFront) return customFront;
    return selectedMember.photoUrl;
  }, [customFront, selectedMember]);

  const finalBack = useMemo(() => {
    if (customBack) return customBack;
    return '/brand/back.png';
  }, [customBack]);

  const finalBand = useMemo(() => {
    if (plainBand) return undefined;
    if (customBand) return customBand;
    return defaultBandUrl || undefined;
  }, [plainBand, customBand, defaultBandUrl]);

  // Handle file uploads
  const handleUpload = (e, setter) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setter(event.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="studio-container">
      <div className="studio-background-grid" />

      {/* Main 3D Viewport on Left */}
      <div className="viewport-area">
        {/* Header */}
        <header className="studio-header">
          <div className="brand-section">
            <span className="brand-badge">Octen Brand</span>
            <h1 className="brand-title">
              3D Lanyard & Badge Studio
              <span className="brand-subtitle">React Bits & Three.js</span>
            </h1>
          </div>

          <div className="header-actions">
            <button 
              className="action-btn"
              onClick={() => setRemountKey(k => k + 1)}
              title="Reset Badge Simulation"
            >
              <RefreshCw size={13} />
              Reset
            </button>
          </div>
        </header>

        {/* Lanyard canvas */}
        <main className="lanyard-stage">
          <Lanyard
            key={remountKey}
            frontImage={finalFront}
            backImage={finalBack}
            frontTemplate={frontTemplate}
            strapImage={finalBand}
            imageFit={imageFit}
            cardColor={cardColor}
            orientation={orientation}
            finish={finish}
            cornerRadius={cornerRadius}
            size={size}
            anchor={anchor}
            strapLength={strapLength}
            strapColor={strapColor}
            strapWidth={strapWidth}
            metal={metal}
            gravity={gravity}
            damping={damping}
            elasticity={elasticity}
            breeze={breeze}
            interactive={interactive}
            intro={intro}
            holoPreset={holoPreset}
            holoIntensity={holoIntensity}
            holoFoilColor={holoFoilColor}
          />

          {/* Interactive HUD Hint */}
          <div className="stage-hud">
            <div className="hud-item">
              <span className="hud-key">Drag</span>
              <span>Drag to swing or toss badge</span>
            </div>
            <div className="hud-item">
              <span className="hud-key">Click</span>
              <span>Click to flip card face</span>
            </div>
          </div>
        </main>
      </div>

      {/* Hidden File Inputs for Uploads */}
      <input 
        type="file" 
        accept="image/*" 
        ref={frontInputRef} 
        style={{ display: 'none' }} 
        onChange={e => handleUpload(e, setCustomFront)}
      />
      <input 
        type="file" 
        accept="image/*" 
        ref={backInputRef} 
        style={{ display: 'none' }} 
        onChange={e => handleUpload(e, setCustomBack)}
      />
      <input 
        type="file" 
        accept="image/*" 
        ref={bandInputRef} 
        style={{ display: 'none' }} 
        onChange={e => handleUpload(e, setCustomBand)}
      />

      {/* Sidebar Toggle Button */}
      <button 
        className={`sidebar-toggle-btn ${sidebarOpen ? '' : 'collapsed'}`}
        onClick={() => setSidebarOpen(!sidebarOpen)}
        title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
      >
        {sidebarOpen ? <PanelRightClose size={18} /> : <PanelRightOpen size={18} />}
      </button>

      {/* Right Control Sidebar */}
      <aside className={`control-sidebar ${sidebarOpen ? '' : 'collapsed'}`}>
        <div className="sidebar-scroll">

          {/* 1. Octen Team Member Section */}
          <section className="section-block">
            <div className="section-title">
              <Users size={14} />
              <span>Octen Team Members ({TEAM_MEMBERS.length})</span>
            </div>


            {/* Member selector */}
            <div className="member-list-scroll">
              {TEAM_MEMBERS.map(m => (
                <button
                  key={m.id}
                  className={`member-chip ${selectedMember.id === m.id ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedMember(m);
                    setCustomFront(null);
                    setCustomBack(null);
                  }}
                >
                  <img src={m.photoUrl} alt={m.nameEn} className="member-avatar" />
                  <div className="member-info">
                    <span className="member-name">{m.nameEn}</span>
                    <span className="member-role">{m.nameZh || m.title}</span>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* 2. Customize / Appearance & Material */}
          <section className="section-block">
            <div className="section-title">
              <Sparkles size={14} />
              <span>Appearance & Materials</span>
            </div>

            {/* Front Image */}
            <div className="control-row">
              <span className="control-label">Front Image</span>
              <button className="upload-btn" onClick={() => frontInputRef.current?.click()}>
                Upload
              </button>
            </div>

            {/* Back Image */}
            <div className="control-row">
              <span className="control-label">Back Image</span>
              <button className="upload-btn" onClick={() => backInputRef.current?.click()}>
                Upload
              </button>
            </div>

            {/* Front Template (bg + laser logo) */}
            <div className="control-row">
              <span className="control-label">Front Template</span>
              <label className="switch-control">
                <input 
                  type="checkbox" 
                  checked={frontTemplate} 
                  onChange={e => setFrontTemplate(e.target.checked)} 
                />
                <span className="switch-slider"></span>
              </label>
            </div>

            {/* HoloCard Holographic Preset for Laser Logo */}
            {frontTemplate && (
              <>
                <div className="control-row">
                  <span className="control-label">Logo Holo Preset</span>
                  <select 
                    className="select-dropdown"
                    value={holoPreset} 
                    onChange={e => setHoloPreset(e.target.value)}
                  >
                    <option value="rainbow">Rainbow</option>
                    <option value="swirl">Swirl</option>
                    <option value="glitter">Glitter</option>
                    <option value="shards">Shards</option>
                    <option value="bursts">Bursts</option>
                    <option value="stars">Stars</option>
                    <option value="cosmos">Cosmos</option>
                    <option value="gold">Gold</option>
                  </select>
                </div>

                <div className="control-row">
                  <span className="control-label">Logo Holo Intensity</span>
                  <div className="range-control">
                    <input 
                      type="range" 
                      min="0.1" 
                      max="1" 
                      step="0.05" 
                      value={holoIntensity} 
                      onChange={e => setHoloIntensity(parseFloat(e.target.value))} 
                    />
                    <span className="range-value">{holoIntensity.toFixed(2)}</span>
                  </div>
                </div>

                <div className="control-row">
                  <span className="control-label">Logo Foil Metal</span>
                  <div className="color-pill">
                    <div className="color-dot" style={{ backgroundColor: holoFoilColor }}>
                      <input 
                        type="color" 
                        value={holoFoilColor} 
                        onChange={e => setHoloFoilColor(e.target.value)} 
                      />
                    </div>
                    <span className="color-hex-text">{holoFoilColor}</span>
                  </div>
                </div>
              </>
            )}


            {/* Image Fit */}
            <div className="control-row">
              <span className="control-label">Image Fit</span>
              <select 
                className="select-dropdown"
                value={imageFit} 
                onChange={e => setImageFit(e.target.value)}
              >
                <option value="cover">Cover</option>
                <option value="contain">Contain</option>
              </select>
            </div>

            {/* Orientation */}
            <div className="control-row">
              <span className="control-label">Orientation</span>
              <select 
                className="select-dropdown"
                value={orientation} 
                onChange={e => setOrientation(e.target.value)}
              >
                <option value="portrait">Portrait</option>
                <option value="landscape">Landscape</option>
              </select>
            </div>

            {/* Finish */}
            <div className="control-row">
              <span className="control-label">Finish</span>
              <select 
                className="select-dropdown"
                value={finish} 
                onChange={e => setFinish(e.target.value)}
              >
                <option value="glossy">Glossy</option>
                <option value="matte">Matte</option>
                <option value="holographic">Holographic</option>
                <option value="metallic">Metallic</option>
              </select>
            </div>

            {/* Metal */}
            <div className="control-row">
              <span className="control-label">Metal</span>
              <select 
                className="select-dropdown"
                value={metal} 
                onChange={e => setMetal(e.target.value)}
              >
                <option value="silver">Silver</option>
                <option value="gold">Gold</option>
                <option value="graphite">Graphite</option>
              </select>
            </div>

            {/* Card Color */}
            <div className="control-row">
              <span className="control-label">Card Color</span>
              <div className="color-pill">
                <div className="color-dot" style={{ backgroundColor: cardColor }}>
                  <input 
                    type="color" 
                    value={cardColor} 
                    onChange={e => setCardColor(e.target.value)} 
                  />
                </div>
                <span className="color-hex-text">{cardColor}</span>
              </div>
            </div>

            {/* Plain Band */}
            <div className="control-row">
              <span className="control-label">Plain Band</span>
              <label className="switch-control">
                <input 
                  type="checkbox" 
                  checked={plainBand} 
                  onChange={e => setPlainBand(e.target.checked)} 
                />
                <span className="switch-slider"></span>
              </label>
            </div>

            {/* Band Color */}
            <div className="control-row">
              <span className="control-label">Band Color</span>
              <div className="color-pill">
                <div className="color-dot" style={{ backgroundColor: strapColor }}>
                  <input 
                    type="color" 
                    value={strapColor} 
                    onChange={e => setStrapColor(e.target.value)} 
                  />
                </div>
                <span className="color-hex-text">{strapColor}</span>
              </div>
            </div>

            {/* Corner Radius */}
            <div className="control-row">
              <span className="control-label">Corner Radius</span>
              <div className="slider-container">
                <div className="slider-track-wrap">
                  <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.02"
                    value={cornerRadius} 
                    onChange={e => setCornerRadius(parseFloat(e.target.value))}
                    className="custom-range-slider"
                  />
                </div>
                <span className="slider-num-value">{cornerRadius.toFixed(1)}</span>
              </div>
            </div>


            {/* Size */}
            <div className="control-row">
              <span className="control-label">Size</span>
              <div className="slider-container">
                <div className="slider-track-wrap">
                  <input 
                    type="range" 
                    min="0.2" 
                    max="0.85" 
                    step="0.05"
                    value={size} 
                    onChange={e => setSize(parseFloat(e.target.value))}
                    className="custom-range-slider"
                  />
                </div>
                <span className="slider-num-value">{size.toFixed(1)}</span>
              </div>
            </div>

            {/* Band Length */}
            <div className="control-row">
              <span className="control-label">Band Length</span>
              <div className="slider-container">
                <div className="slider-track-wrap">
                  <input 
                    type="range" 
                    min="0.1" 
                    max="0.9" 
                    step="0.05"
                    value={strapLength} 
                    onChange={e => setStrapLength(parseFloat(e.target.value))}
                    className="custom-range-slider"
                  />
                </div>
                <span className="slider-num-value">{strapLength.toFixed(1)}</span>
              </div>
            </div>

            {/* Band Width */}
            <div className="control-row">
              <span className="control-label">Band Width</span>
              <div className="slider-container">
                <div className="slider-track-wrap">
                  <input 
                    type="range" 
                    min="0.4" 
                    max="1.5" 
                    step="0.05"
                    value={strapWidth} 
                    onChange={e => setStrapWidth(parseFloat(e.target.value))}
                    className="custom-range-slider"
                  />
                </div>
                <span className="slider-num-value">{strapWidth.toFixed(2)}</span>
              </div>
            </div>

            {/* Interactive */}
            <div className="control-row">
              <span className="control-label">Interactive</span>
              <label className="switch-control">
                <input 
                  type="checkbox" 
                  checked={interactive} 
                  onChange={e => setInteractive(e.target.checked)} 
                />
                <span className="switch-slider"></span>
              </label>
            </div>

            {/* Intro */}
            <div className="control-row">
              <span className="control-label">Intro</span>
              <label className="switch-control">
                <input 
                  type="checkbox" 
                  checked={intro} 
                  onChange={e => setIntro(e.target.checked)} 
                />
                <span className="switch-slider"></span>
              </label>
            </div>
          </section>

        </div>
      </aside>
    </div>
  );
}
