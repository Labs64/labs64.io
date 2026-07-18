---
layout: page
title: "Fair, Transparent Dual Licensing"
description: "Understand the Labs64.IO dual licensing model. Choose between our free Open Source community edition and our fully-supported Enterprise tier."
permalink: /pricing/
---

<style>
.pricing-section {
    padding: 60px 0 40px 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

.pricing-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 30px;
    max-width: 1000px;
    margin: 0 auto;
    align-items: stretch;
}

.pricing-card {
    flex: 1;
    min-width: 320px;
    background: #ffffff;
    border-radius: 20px;
    padding: 40px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
    border: 1px solid #e2e8f0;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 1;
}

.pricing-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    z-index: 2;
}

.pricing-card.enterprise {
    background: linear-gradient(145deg, #853E29 0%, #682e1b 100%);
    color: #ffffff;
    border: 1px solid #682e1b;
    transform: scale(1.03);
    box-shadow: 0 20px 25px -5px rgba(133, 62, 41, 0.15), 0 10px 10px -5px rgba(133, 62, 41, 0.08);
}

.pricing-card.enterprise:hover {
    transform: scale(1.03) translateY(-8px);
    box-shadow: 0 25px 35px -5px rgba(133, 62, 41, 0.25), 0 15px 15px -5px rgba(133, 62, 41, 0.1);
}

.badge-recommended {
    position: absolute;
    top: -15px;
    left: 50%;
    transform: translateX(-50%);
    background: #E14817;
    color: white;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    padding: 6px 16px;
    border-radius: 20px;
    box-shadow: 0 4px 6px rgba(225, 72, 23, 0.3);
    white-space: nowrap;
}

.pricing-title {
    font-size: 28px;
    font-weight: 800;
    margin-bottom: 10px;
    margin-top: 0;
}

.enterprise .pricing-title {
    color: #ffffff;
}

.pricing-subtitle {
    font-size: 16px;
    color: #64748b;
    margin-bottom: 30px;
    line-height: 1.6;
}

.enterprise .pricing-subtitle {
    color: #ffdcb3;
}

.pricing-features {
    list-style: none;
    padding: 0;
    margin: 0 0 40px 0;
    flex-grow: 1;
}

.pricing-features li {
    display: flex;
    align-items: flex-start;
    margin-bottom: 16px;
    font-size: 15px;
    line-height: 1.6;
    color: #334155;
}

.enterprise .pricing-features li {
    color: #ffffff;
}

.pricing-features i {
    margin-right: 12px;
    margin-top: 4px;
    color: #E14817;
    font-size: 18px;
}

.enterprise .pricing-features i {
    color: #ffbba3;
}

.btn-pricing {
    display: inline-block;
    width: 100%;
    text-align: center;
    padding: 16px 24px;
    border-radius: 12px;
    font-weight: 600;
    font-size: 16px;
    transition: all 0.2s ease;
    text-decoration: none !important;
}

.btn-community {
    background: #f1f5f9;
    color: #334155;
    border: 1px solid #cbd5e1;
}

.btn-community:hover {
    background: #e2e8f0;
    color: #0f172a;
}

.btn-enterprise {
    background: #E14817;
    color: #ffffff;
    border: none;
    box-shadow: 0 4px 6px rgba(225, 72, 23, 0.2);
}

.btn-enterprise:hover {
    background: #c43b10;
    color: #ffffff;
    box-shadow: 0 6px 10px rgba(225, 72, 23, 0.3);
}

.faq-section {
    padding: 40px 0 80px 0;
}

.faq-wrapper {
    max-width: 1000px;
    margin: 0 auto;
}

.faq-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
}

.faq-item {
    flex: 1;
    min-width: 320px;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 24px;
    margin-bottom: 0;
    transition: box-shadow 0.2s ease, transform 0.2s ease;
}

.faq-item:hover {
    box-shadow: 0 8px 12px -1px rgba(0, 0, 0, 0.05);
    transform: translateY(-2px);
}

.faq-question {
    font-size: 18px;
    font-weight: 700;
    color: #853E29;
    margin-bottom: 12px;
    margin-top: 0;
}

.faq-answer {
    color: #475569;
    line-height: 1.6;
    margin: 0;
}

@media (max-width: 768px) {
    .pricing-card.enterprise {
        transform: scale(1);
    }
    .pricing-card.enterprise:hover {
        transform: translateY(-4px);
    }
    .pricing-grid {
        gap: 40px;
    }
}
</style>

<div class="row NL_main_banner">
    <div class="col-md-8 col-md-offset-2 NL_about">
        <h1>Pricing & Licensing</h1>
        <span>The Labs64.IO Ecosystem operates on a **Dual Licensing** model. This allows developers and startups to build freely with our open-source tools, while providing enterprises with the commercial protections, support, and managed services they require to scale securely.</span>
    </div>
</div>

<div class="pricing-section">
    <div class="container">
        <div class="pricing-grid">
            
            <!-- Community Edition -->
            <div class="pricing-card">
                <h2 class="pricing-title">Community Edition</h2>
                <div class="pricing-subtitle">Open Source & Free Forever. Perfect for developers, startups, and teams who want to self-host and manage their own infrastructure.</div>
                
                <ul class="pricing-features">
                    <li><i class="fa fa-check-circle"></i> Full access to source code</li>
                    <li><i class="fa fa-check-circle"></i> Apache 2.0 / AGPL Licenses</li>
                    <li><i class="fa fa-check-circle"></i> Self-hosted via Helm and ArgoCD</li>
                    <li><i class="fa fa-check-circle"></i> Community support via GitHub issues</li>
                </ul>
                
                <a href="https://github.com/topics/labs64-io" class="btn-pricing btn-community"><i class="fa fa-github"></i> Get Started on GitHub</a>
            </div>

            <!-- Enterprise Edition -->
            <div class="pricing-card enterprise">
                <div class="badge-recommended">For Production</div>
                <h2 class="pricing-title">Enterprise Edition</h2>
                <div class="pricing-subtitle">Commercial License & Support. Designed for organizations requiring commercial protections, dedicated SLAs, and expert guidance.</div>
                
                <ul class="pricing-features">
                    <li><i class="fa fa-check-circle"></i> Commercial license (No copyleft restrictions)</li>
                    <li><i class="fa fa-check-circle"></i> Priority SLAs and dedicated support channels</li>
                    <li><i class="fa fa-check-circle"></i> Architectural consulting and integration assistance</li>
                    <li><i class="fa fa-check-circle"></i> Optional Managed SaaS deployment</li>
                </ul>
                
                <a href="mailto:info@labs64.io" class="btn-pricing btn-enterprise">Contact Sales</a>
            </div>

        </div>
    </div>
</div>

<div class="faq-section">
    <div class="container">
        <div class="faq-wrapper">
            <h2 style="text-align: center; margin-bottom: 40px; font-weight: 800; color: #853E29; font-size: 32px;">Frequently Asked Questions</h2>
            
            <div class="faq-grid">
                <div class="faq-item">
                    <h3 class="faq-question">Can I mix Open Source and Enterprise modules?</h3>
                    <p class="faq-answer">Yes. You can start with the Community edition and upgrade specific modules to Enterprise licenses as your compliance or support requirements evolve.</p>
                </div>
                
                <div class="faq-item">
                    <h3 class="faq-question">What is the "Managed SaaS option"?</h3>
                    <p class="faq-answer">Instead of self-hosting, our expert team can deploy, manage, and scale the Labs64.IO ecosystem for you in a dedicated, secure cloud environment. <a href="mailto:info@labs64.io" style="color: #E14817; font-weight: 600; text-decoration: none;">Contact us</a> for a custom quote.</p>
                </div>
            </div>
        </div>
    </div>
</div>
