const fs = require('fs');
const path = require('path');

const deckScriptPath = path.join(__dirname, 'build_updated_deck.js');
let scriptContent = fs.readFileSync(deckScriptPath, 'utf8');

// 1. Define the RO Slide HTML
const roSlideHtml = `    <!-- 6 · REVERSE OSMOSIS -->
    <section class="slide topic" data-sim="ro" data-name="Reverse osmosis">
      <div class="stagewrap">
        <canvas aria-label="Animation: reverse osmosis membrane separation"></canvas>
        <div class="ctl"></div>
      </div>
      <div class="theory">
        <p class="eyebrow">Membrane Separation · External Treatment</p>
        <h2>Reverse osmosis (RO)</h2>
        <p class="lede">When hydraulic pressure greater than osmotic pressure (P &gt; π) is applied to saline feed water, pure water molecules are forced backward through a semi-permeable membrane, leaving concentrated salts behind.</p>
        <div class="now"></div>
        <ol class="eqs"></ol>
        <div class="pc">
          <div>
            <h4>Membrane Rejection</h4>
            <p>Porous polymer thin-film (cellulose acetate / polyamide) blocks 95–99% of dissolved ions, silica, bacteria, and pyrogens.</p>
          </div>
          <div>
            <h4>Advantages &amp; Limits</h4>
            <p>Delivers near-distilled quality without chemical regenerants. Membranes require pre-filtration to prevent chlorine attack and scaling.</p>
          </div>
        </div>
      </div>
      <div class="notes">Reverse Osmosis is a pressure-driven membrane process. Explain the three regimes: 1) P &lt; π is natural osmosis where water moves dilute to concentrated; 2) P = π is osmotic equilibrium with zero net flow; 3) P &gt; π (15–40 bar) forces water backward from concentrated to dilute. Highlight membrane materials: cellulose acetate (hydrolyzes above 35°C, limited pH) and polyamide (intolerant of free chlorine). Emphasize that RO rejects bacteria, viruses, pyrogens, and 99% of mineral salts.</div>
    </section>

`;

// 2. Insert RO slide before Slide 6 (Priming & Foaming) and re-number
const boilerSlideMarker = '<!-- 6 · PRIMING & FOAMING -->';
if (!scriptContent.includes(boilerSlideMarker)) {
  console.error('Could not find boilerSlideMarker');
  process.exit(1);
}

// Replace boiler header comment to 7
scriptContent = scriptContent.replace(boilerSlideMarker, roSlideHtml + '    <!-- 7 · PRIMING & FOAMING -->');

// Replace compare header comment to 8
scriptContent = scriptContent.replace('<!-- 7 · COMPARE -->', '<!-- 8 · COMPARE -->');

// 3. Update comparison table in Slide 8 (Compare) to include Reverse Osmosis (RO)
const edRowMarker = `            <tr>
              <td>Electrodialysis (ED)</td>
              <td>DC electric field drives ions across alternating cation (CM) and anion (AM) selective membranes</td>
              <td>Reduces bulk mineral ions by 80–90%</td>
              <td>Significantly reduced in product compartments</td>
              <td>None (purely electrical energy driven)</td>
              <td>High electrical power cost at high salinity; leaves uncharged organics, silica, and bacteria untouched.</td>
              <td>Brackish water desalination; feed pre-treatment</td>
            </tr>`;

const edPlusRoRows = `            <tr>
              <td>Electrodialysis (ED)</td>
              <td>DC electric field drives ions across alternating cation (CM) and anion (AM) selective membranes</td>
              <td>Reduces bulk mineral ions by 80–90%</td>
              <td>Significantly reduced in product compartments</td>
              <td>None (purely electrical energy driven)</td>
              <td>High electrical power cost at high salinity; leaves uncharged organics, silica, and bacteria untouched.</td>
              <td>Brackish water desalination; feed pre-treatment</td>
            </tr>
            <tr>
              <td>Reverse Osmosis (RO)</td>
              <td>Hydraulic pressure P &gt; π forces solvent backward through semi-permeable membrane</td>
              <td>Rejects 95–99% of dissolved mineral ions</td>
              <td>Reduced by 95–99% (near-distilled purity)</td>
              <td>None (15–40 bar mechanical pump power)</td>
              <td>Membranes sensitive to chlorine, pH extremes, and scaling; requires pre-treatment.</td>
              <td>High-pressure boilers, seawater/brackish feed, pure water</td>
            </tr>`;

if (!scriptContent.includes(edRowMarker)) {
  console.error('Could not find edRowMarker in comparison table');
  process.exit(1);
}
scriptContent = scriptContent.replace(edRowMarker, edPlusRoRows);

// Update takeaway note in comparison table
const oldTakeaway = `<p class="foot-note">Summary Takeaway: Zeolite is the economical softener for low-pressure systems; Ion Exchange is the gold standard for high-pressure power generation; Electrodialysis is an electrochemical desalter for brackish feed water. Priming and foaming are the direct operating penalties of poor feed water conditioning.</p>`;
const newTakeaway = `<p class="foot-note">Summary Takeaway: Zeolite softens water for low-pressure systems; Ion Exchange and RO deliver ultra-pure demineralised feed for high-pressure boilers; Electrodialysis desalts brackish water via electric fields. Neglected feed water leads directly to priming, foaming, and tube rupture.</p>`;

if (scriptContent.includes(oldTakeaway)) {
  scriptContent = scriptContent.replace(oldTakeaway, newTakeaway);
}

// 4. Remove Slide 8 (Viva) completely
const vivaStartMarker = '    <!-- 8 · VIVA -->';
const vivaEndMarker = '  </main>';

const vivaStartIdx = scriptContent.indexOf(vivaStartMarker);
const vivaEndIdx = scriptContent.indexOf(vivaEndMarker);

if (vivaStartIdx === -1 || vivaEndIdx === -1) {
  console.error('Could not find Viva markers:', { vivaStartIdx, vivaEndIdx });
  process.exit(1);
}

scriptContent = scriptContent.slice(0, vivaStartIdx) + scriptContent.slice(vivaEndIdx);

// 5. Define class RO extends Sim in JavaScript
const roClassCode = `      /* ============ 5 · reverse osmosis (RO) ============ */
      class RO extends Sim {
        constructor(sec) {
          super(sec);
          this.stages = [
            { name: 'Natural Osmosis (P < π)', dur: 7, text: 'Without applied pressure (P < π), water molecules naturally diffuse through the semi-permeable membrane into the concentrated saline arm to balance chemical potential.', eq: [0] },
            { name: 'Equilibrium (P = π)', dur: 6, text: 'Applied hydrostatic pressure balances solution osmotic pressure (P = π). Net solvent migration across the membrane drops to zero.', eq: [1] },
            { name: 'Reverse Osmosis (P > π)', dur: 18, text: 'Applied pressure exceeds osmotic pressure (P > π = 15–40 bar). Pure H₂O molecules are forced through membrane pores into the freshwater arm; ions are rejected.', eq: [2] },
            { name: 'Concentrate Flush', dur: 9, text: 'Pure desalted permeate overflows into the product tank. Concentrated reject brine is purged through the discharge valve to prevent membrane scaling.', eq: [2] }
          ];
          this.eqs = [
            'P < π : Natural Osmosis (solvent moves dilute → concentrated)',
            'P = π : Osmotic Equilibrium (hydrostatic pressure balances π)',
            'P > π : Reverse Osmosis (pure solvent forced concentrated → dilute, 99% ions rejected)'
          ];
          this.start();
        }
        init() {
          this.pistonY = 175;
          this.freshLevel = 200;
          this.appliedP = 0; // bar
          this.flux = 'left';
          this.permeateCount = 0;
          this.brineDrain = false;

          // Water particles: move between chambers or circulate
          this.h2o = [];
          for (let i = 0; i < 26; i++) {
            this.h2o.push({
              x: rnd(140, 310),
              y: rnd(200, 420),
              vx: rnd(-12, 12),
              vy: rnd(-12, 12),
              side: 'salt'
            });
          }
          for (let i = 0; i < 18; i++) {
            this.h2o.push({
              x: rnd(480, 650),
              y: rnd(220, 420),
              vx: rnd(-12, 12),
              vy: rnd(-12, 12),
              side: 'fresh'
            });
          }

          // Dissolved salt ions: strictly trapped in the salt chamber (left)
          this.ions = [];
          const mk = (t, n) => {
            for (let i = 0; i < n; i++) {
              this.ions.push({
                t,
                x: rnd(145, 315),
                y: rnd(210, 415),
                vx: rnd(-16, 16),
                vy: rnd(-16, 16)
              });
            }
          };
          mk('Na', 7);
          mk('Cl', 7);
          mk('Ca', 4);

          // Outflow droplets
          this.drops = [];
          this.ripples = [];
        }
        prepare(i) {
          if (i === 0) {
            this.pistonY = 170;
            this.freshLevel = 195;
            this.appliedP = 0;
            this.flux = 'left';
            this.brineDrain = false;
          } else if (i === 1) {
            this.pistonY = 175;
            this.freshLevel = 205;
            this.appliedP = 15;
            this.flux = 'none';
            this.brineDrain = false;
          } else if (i === 2) {
            this.pistonY = 190;
            this.freshLevel = 170;
            this.appliedP = 35;
            this.flux = 'right';
            this.brineDrain = false;
          } else if (i === 3) {
            this.pistonY = 230;
            this.freshLevel = 155;
            this.appliedP = 35;
            this.flux = 'right';
            this.brineDrain = true;
          }
        }
        update(d) {
          const X_L0 = 130, X_L1 = 330;
          const X_R0 = 470, X_R1 = 670;
          const X_MEM = 400, W_MEM = 18;
          const Y_BOT = 430, Y_MID_TOP = 320;

          // Animate pressure and levels per stage
          if (this.stage === 0) {
            this.appliedP = 0;
            this.flux = 'left';
            this.pistonY = Math.max(160, this.pistonY - d * 2);
            this.freshLevel = Math.min(220, this.freshLevel + d * 2);
            this.brineDrain = false;
          } else if (this.stage === 1) {
            this.appliedP = 15;
            this.flux = 'none';
            this.brineDrain = false;
          } else if (this.stage === 2) {
            this.appliedP = 35;
            this.flux = 'right';
            this.pistonY = Math.min(245, this.pistonY + d * 3.5);
            this.freshLevel = Math.max(155, this.freshLevel - d * 3.5);
            this.brineDrain = false;
          } else if (this.stage === 3) {
            this.appliedP = 35;
            this.flux = 'right';
            this.brineDrain = true;
          }

          // Update salt ions (restricted strictly to salt chamber and left half of connecting tube)
          for (const p of this.ions) {
            p.x += p.vx * d;
            p.y += p.vy * d;

            // Bounce off left chamber walls
            if (p.x < X_L0 + 12) { p.x = X_L0 + 12; p.vx = Math.abs(p.vx); }
            if (p.y > Y_BOT - 12) { p.y = Y_BOT - 12; p.vy = -Math.abs(p.vy); }

            // Top boundary: piston
            if (p.x <= X_L1 && p.y < this.pistonY + 16) {
              p.y = this.pistonY + 16;
              p.vy = Math.abs(p.vy);
            }

            // Tube entrance: between X_L1 and X_MEM
            if (p.x > X_L1 && p.y < Y_MID_TOP + 12) {
              p.y = Y_MID_TOP + 12;
              p.vy = Math.abs(p.vy);
            }

            // MEMBRANE EXCLUSION: cannot cross X_MEM - W_MEM / 2
            if (p.x > X_MEM - W_MEM / 2 - 12) {
              p.x = X_MEM - W_MEM / 2 - 12;
              p.vx = -Math.abs(p.vx);
              // Small rejection pulse
              if (Math.random() < 0.2) {
                this.ripples.push({ x: X_MEM - W_MEM / 2, y: p.y, r: 2, maxR: 12, alpha: 0.8, col: COL.ca });
              }
            }
          }

          // Update water molecules
          for (const p of this.h2o) {
            // Apply drift based on flux
            if (this.flux === 'right' && p.x < X_MEM) {
              p.vx += (rnd(18, 45) - p.vx) * d * 3;
            } else if (this.flux === 'left' && p.x > X_MEM) {
              p.vx += (rnd(-40, -15) - p.vx) * d * 3;
            } else {
              p.vx += rnd(-15, 15) * d;
              p.vy += rnd(-15, 15) * d;
            }
            p.vx = clamp(p.vx, -40, 40);
            p.vy = clamp(p.vy, -35, 35);

            p.x += p.vx * d;
            p.y += p.vy * d;

            // Water crossing membrane from left to right (Reverse Osmosis)
            if (this.flux === 'right' && p.x >= X_MEM - 4 && p.x <= X_MEM + 12 && p.y >= Y_MID_TOP && p.y <= Y_BOT) {
              p.x = X_MEM + 16 + rnd(2, 10);
              p.vx = rnd(15, 35);
              p.side = 'fresh';
              this.permeateCount++;
              this.ripples.push({ x: X_MEM + W_MEM / 2, y: p.y, r: 2, maxR: 14, alpha: 0.85, col: COL.h2o });
            }

            // Water crossing membrane from right to left (Natural Osmosis)
            if (this.flux === 'left' && p.x <= X_MEM + 4 && p.x >= X_MEM - 12 && p.y >= Y_MID_TOP && p.y <= Y_BOT) {
              p.x = X_MEM - 16 - rnd(2, 10);
              p.vx = rnd(-35, -15);
              p.side = 'salt';
            }

            // Left side boundaries
            if (p.x < X_MEM) {
              if (p.x < X_L0 + 8) { p.x = X_L0 + 8; p.vx = Math.abs(p.vx); }
              if (p.y > Y_BOT - 8) { p.y = Y_BOT - 8; p.vy = -Math.abs(p.vy); }
              if (p.x <= X_L1 && p.y < this.pistonY + 8) { p.y = this.pistonY + 8; p.vy = Math.abs(p.vy); }
              if (p.x > X_L1 && p.y < Y_MID_TOP + 6) { p.y = Y_MID_TOP + 6; p.vy = Math.abs(p.vy); }
            }

            // Right side boundaries
            if (p.x >= X_MEM) {
              if (p.y > Y_BOT - 8) { p.y = Y_BOT - 8; p.vy = -Math.abs(p.vy); }
              if (p.x < X_R0 && p.y < Y_MID_TOP + 6) { p.y = Y_MID_TOP + 6; p.vy = Math.abs(p.vy); }
              if (p.x > X_R1 - 8) { p.x = X_R1 - 8; p.vx = -Math.abs(p.vx); }
              if (p.x >= X_R0 && p.y < this.freshLevel + 8) {
                // If at overflow height on fresh side, can spill over
                if (this.freshLevel <= 165 && p.x > X_R1 - 25) {
                  this.drops.push({ x: X_R1 + 10, y: 165, vy: rnd(40, 80) });
                  p.y = Y_BOT - 16;
                  p.x = rnd(X_R0 + 20, X_R1 - 20);
                } else {
                  p.y = this.freshLevel + 8;
                  p.vy = Math.abs(p.vy);
                }
              }
            }
          }

          // Outflow droplets animation
          for (const dp of this.drops) {
            dp.y += dp.vy * d;
            dp.vy += 120 * d;
          }
          this.drops = this.drops.filter(dp => dp.y < 380);

          // Ripples
          for (const rp of this.ripples) {
            rp.r += 24 * d;
            rp.alpha -= 1.4 * d;
          }
          this.ripples = this.ripples.filter(rp => rp.alpha > 0);
        }
        draw(c) {
          c.clearRect(0, 0, LW, LH);

          const X_L0 = 130, X_L1 = 330;
          const X_R0 = 470, X_R1 = 670;
          const X_MEM = 400, W_MEM = 18;
          const Y_BOT = 430, Y_MID_TOP = 320;
          const W_COL = 200;

          // 1. Water liquid fills
          // Salt water fill (Left)
          c.fillStyle = COL.wsolid;
          c.beginPath();
          c.moveTo(X_L0, this.pistonY);
          c.lineTo(X_L1, this.pistonY);
          c.lineTo(X_L1, Y_MID_TOP);
          c.lineTo(X_MEM - W_MEM / 2, Y_MID_TOP);
          c.lineTo(X_MEM - W_MEM / 2, Y_BOT);
          c.lineTo(X_L0, Y_BOT);
          c.closePath();
          c.fill();

          // Fresh water fill (Right)
          c.fillStyle = COL.wsolid;
          c.beginPath();
          c.moveTo(X_R0, this.freshLevel);
          c.lineTo(X_R1, this.freshLevel);
          // Spout opening if level reaches 165
          if (this.freshLevel <= 165) {
            c.lineTo(X_R1 + 24, 165);
            c.lineTo(X_R1 + 24, 178);
            c.lineTo(X_R1, 178);
          }
          c.lineTo(X_R1, Y_BOT);
          c.lineTo(X_MEM + W_MEM / 2, Y_BOT);
          c.lineTo(X_MEM + W_MEM / 2, Y_MID_TOP);
          c.lineTo(X_R0, Y_MID_TOP);
          c.closePath();
          c.fill();

          // 2. Ripples
          for (const rp of this.ripples) {
            c.strokeStyle = rp.col;
            c.globalAlpha = Math.max(0, rp.alpha);
            c.lineWidth = 1.5;
            c.beginPath();
            c.arc(rp.x, rp.y, rp.r, 0, TAU);
            c.stroke();
            c.globalAlpha = 1;
          }

          // 3. Draw water molecules (small clean spheres)
          for (const p of this.h2o) {
            c.fillStyle = COL.h2o;
            c.beginPath();
            c.arc(p.x, p.y, 4, 0, TAU);
            c.fill();
            c.strokeStyle = COL.paper;
            c.lineWidth = 0.8;
            c.stroke();
          }

          // 4. Draw salt ions on left
          for (const p of this.ions) {
            ion(c, p.t, p.x, p.y);
          }

          // 5. Overflow droplets into collection beaker
          c.fillStyle = COL.h2o;
          for (const dp of this.drops) {
            c.beginPath();
            c.arc(dp.x, dp.y, 3.5, 0, TAU);
            c.fill();
          }

          // 6. Draw U-Tube Glass Vessel Outlines
          c.strokeStyle = COL.ink;
          c.lineWidth = 3;
          c.lineCap = 'round';
          c.lineJoin = 'round';

          // Outer boundary
          c.beginPath();
          c.moveTo(X_L0, 80);
          c.lineTo(X_L0, Y_BOT);
          c.lineTo(X_R1, Y_BOT);
          c.lineTo(X_R1, 165);
          c.lineTo(X_R1 + 24, 165); // Spout top
          c.lineTo(X_R1 + 24, 178); // Spout lip
          c.lineTo(X_R1, 178);
          c.lineTo(X_R1, 80);
          c.stroke();

          // Inner U notch
          c.beginPath();
          c.moveTo(X_L1, 80);
          c.lineTo(X_L1, Y_MID_TOP);
          c.lineTo(X_R0, Y_MID_TOP);
          c.lineTo(X_R0, 80);
          c.stroke();

          // Collection beaker at right
          c.beginPath();
          c.moveTo(X_R1 + 14, 250);
          c.lineTo(X_R1 + 14, 340);
          c.lineTo(X_R1 + 64, 340);
          c.lineTo(X_R1 + 64, 250);
          c.stroke();
          c.fillStyle = COL.wsolid;
          c.fillRect(X_R1 + 16, 290, 46, 48);
          fx(c, 'PURE WATER', X_R1 + 39, 360, 9.5, COL.ink, 'center', 600);

          // Brine flush valve at bottom left
          c.beginPath();
          c.moveTo(X_L0 + 40, Y_BOT);
          c.lineTo(X_L0 + 40, Y_BOT + 28);
          c.lineTo(X_L0 + 60, Y_BOT + 28);
          c.lineTo(X_L0 + 60, Y_BOT);
          c.stroke();
          if (this.brineDrain) {
            c.fillStyle = COL.ca;
            c.fillRect(X_L0 + 44, Y_BOT, 12, 40);
            fx(c, 'BRINE PURGE ACTIVE', X_L0 + 50, Y_BOT + 52, 9.5, COL.ca, 'center', 600);
          } else {
            fx(c, 'brine valve (closed)', X_L0 + 50, Y_BOT + 44, 9, COL.ink2, 'center');
          }

          // 7. Semi-Permeable Membrane (SPM)
          c.fillStyle = COL.panel;
          c.fillRect(X_MEM - W_MEM / 2, Y_MID_TOP - 4, W_MEM, Y_BOT - Y_MID_TOP + 8);
          c.strokeStyle = COL.ink;
          c.lineWidth = 2;
          c.strokeRect(X_MEM - W_MEM / 2, Y_MID_TOP - 4, W_MEM, Y_BOT - Y_MID_TOP + 8);

          // Pores texture inside membrane
          c.strokeStyle = COL.rule;
          c.lineWidth = 1.5;
          for (let y = Y_MID_TOP + 8; y < Y_BOT; y += 14) {
            c.beginPath();
            c.moveTo(X_MEM - W_MEM / 2 + 3, y);
            c.lineTo(X_MEM + W_MEM / 2 - 3, y);
            c.stroke();
          }

          // 8. Piston Mechanism on Left Arm
          c.fillStyle = COL.ink;
          c.fillRect(X_L0 + 2, this.pistonY, W_COL - 4, 18);
          // Piston rod
          c.fillRect(X_L0 + W_COL / 2 - 8, this.pistonY - 60, 16, 60);

          // Applied Pressure Arrow
          if (this.appliedP > 0) {
            const arrColor = this.appliedP > 15 ? COL.oh : COL.na;
            c.fillStyle = arrColor;
            c.strokeStyle = arrColor;
            c.lineWidth = 3;
            const ax = X_L0 + W_COL / 2, ay = this.pistonY - 72;
            c.beginPath();
            c.moveTo(ax, ay - 35);
            c.lineTo(ax, ay);
            c.stroke();
            c.beginPath();
            c.moveTo(ax - 10, ay - 12);
            c.lineTo(ax, ay);
            c.lineTo(ax + 10, ay - 12);
            c.closePath();
            c.fill();

            fx(c, 'APPLIED PRESSURE', ax, ay - 50, 11, arrColor, 'center', 700);
            fx(c, 'P = ' + this.appliedP + ' bar ' + (this.appliedP > 15 ? '(P > π)' : '(P = π)'), ax, ay - 36, 10.5, arrColor, 'center', 600);
          } else {
            fx(c, 'NO PRESSURE (P = 0 < π)', X_L0 + W_COL / 2, this.pistonY - 30, 10, COL.ink2, 'center');
          }

          // 9. Water flow direction indicator
          if (this.flux === 'right') {
            c.strokeStyle = COL.oh;
            c.lineWidth = 2.5;
            c.beginPath();
            c.moveTo(270, 468);
            c.lineTo(530, 468);
            c.stroke();
            c.fillStyle = COL.oh;
            c.beginPath();
            c.moveTo(520, 463);
            c.lineTo(534, 468);
            c.lineTo(520, 473);
            c.closePath();
            c.fill();
            fx(c, 'WATER FLOW (REVERSE OSMOSIS: CONCENTRATED → DILUTE)', 400, 488, 10.5, COL.oh, 'center', 600);
          } else if (this.flux === 'left') {
            c.strokeStyle = COL.ca;
            c.lineWidth = 2;
            c.beginPath();
            c.moveTo(530, 468);
            c.lineTo(270, 468);
            c.stroke();
            c.fillStyle = COL.ca;
            c.beginPath();
            c.moveTo(280, 463);
            c.lineTo(266, 468);
            c.lineTo(280, 473);
            c.closePath();
            c.fill();
            fx(c, 'WATER FLOW (NATURAL OSMOSIS: DILUTE → CONCENTRATED)', 400, 488, 10.5, COL.ca, 'center', 600);
          } else {
            fx(c, 'OSMOTIC EQUILIBRIUM (NET SOLVENT FLUX = 0)', 400, 488, 10.5, COL.ink2, 'center', 600);
          }

          // 10. Top Dashboards & Labels
          fx(c, 'SALT WATER FEED', X_L0 + W_COL / 2, 65, 11, COL.ink, 'center', 700);
          fx(c, 'concentrated solution', X_L0 + W_COL / 2, 79, 10, COL.ink2, 'center');

          fx(c, 'FRESH WATER', X_R0 + W_COL / 2, 65, 11, COL.ink, 'center', 700);
          fx(c, 'dilute permeate', X_R0 + W_COL / 2, 79, 10, COL.ink2, 'center');

          fx(c, 'SEMI-PERMEABLE MEMBRANE', X_MEM, Y_MID_TOP - 22, 10.5, COL.ink, 'center', 700);
          fx(c, 'pore size ~0.0001 µm', X_MEM, Y_MID_TOP - 10, 9.5, COL.ink2, 'center');

          // Permeate Purity & Salt Rejection Meters
          fx(c, 'SALT REJECTION', 690, 52, 10, COL.ink2, 'left');
          c.font = '700 18px ' + DISP;
          c.fillStyle = this.stage >= 2 ? COL.cl : COL.ink2;
          c.fillText(this.stage >= 2 ? '99.4%' : '—', 690, 74);

          fx(c, 'SOLVENT FLUX', 690, 96, 10, COL.ink2, 'left');
          c.font = '600 12px ' + MONO;
          c.fillStyle = this.flux === 'right' ? COL.oh : this.flux === 'left' ? COL.ca : COL.ink2;
          c.fillText(this.flux === 'right' ? '→ FORCED P>π' : this.flux === 'left' ? '← NATURAL' : 'EQUILIBRIUM', 690, 114);
        }
      }

`;

// Insert roClassCode before Boiler class
const boilerClassMarker = '      /* ============ 5 · boiler: priming and foaming ============ */';
if (!scriptContent.includes(boilerClassMarker)) {
  console.error('Could not find boilerClassMarker');
  process.exit(1);
}

scriptContent = scriptContent.replace(boilerClassMarker, roClassCode + '      /* ============ 6 · boiler: priming and foaming ============ */');

// 6. Register RO in CLS
const oldCls = 'const CLS = { scale: Scale, zeolite: Zeolite, ionex: IonEx, ed: ED, boiler: Boiler };';
const newCls = 'const CLS = { scale: Scale, zeolite: Zeolite, ionex: IonEx, ed: ED, ro: RO, boiler: Boiler };';

if (!scriptContent.includes(oldCls)) {
  console.error('Could not find oldCls in script');
  process.exit(1);
}
scriptContent = scriptContent.replace(oldCls, newCls);

// 7. Update SHORT_NAMES in script:
const oldShortNames = `const SHORT_NAMES = ['Intro', 'Hard water', 'Zeolite', 'Ion-Ex', 'ED', 'Boiler', 'Compare', 'Viva'];`;
const newShortNames = `const SHORT_NAMES = ['Intro', 'Hard water', 'Zeolite', 'Ion-Ex', 'ED', 'RO', 'Boiler', 'Compare'];`;

if (!scriptContent.includes(oldShortNames)) {
  console.error('Could not find oldShortNames');
  process.exit(1);
}
scriptContent = scriptContent.replace(oldShortNames, newShortNames);

// 8. Update agendaTopics in Slide 1:
const oldAgendaTopics = `      const agendaTopics = [
        { i: 1, title: 'Hardness & Scale' },
        { i: 2, title: 'Zeolite Process' },
        { i: 3, title: 'Ion Exchange (DM)' },
        { i: 4, title: 'Electrodialysis' },
        { i: 5, title: 'Boiler Troubles' },
        { i: 6, title: 'Process Comparison' },
        { i: 7, title: 'Viva Voce Guide' }
      ];`;

const newAgendaTopics = `      const agendaTopics = [
        { i: 1, title: 'Hardness & Scale' },
        { i: 2, title: 'Zeolite Process' },
        { i: 3, title: 'Ion Exchange (DM)' },
        { i: 4, title: 'Electrodialysis' },
        { i: 5, title: 'Reverse Osmosis (RO)' },
        { i: 6, title: 'Boiler Troubles' },
        { i: 7, title: 'Process Comparison' }
      ];`;

if (!scriptContent.includes(oldAgendaTopics)) {
  console.error('Could not find oldAgendaTopics');
  process.exit(1);
}
scriptContent = scriptContent.replace(oldAgendaTopics, newAgendaTopics);

// 9. Update Slide 1 Lede to mention Reverse Osmosis:
scriptContent = scriptContent.replace(
  'Three external water treatment processes and the physical-chemical failures that occur when steam boiler feed water is neglected.',
  'Four external water treatment technologies (Zeolite, Ion Exchange, Electrodialysis, Reverse Osmosis) and boiler troubles.'
);

fs.writeFileSync(deckScriptPath, scriptContent, 'utf8');
console.log('Successfully updated build_updated_deck.js with Reverse Osmosis and removed Viva.');

// Compile updated HTML
require('./build_updated_deck.js');
