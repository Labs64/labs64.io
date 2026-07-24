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
    background: #d95e14;
    color: white;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    padding: 6px 16px;
    border-radius: 20px;
    box-shadow: 0 4px 6px rgba(217, 94, 20, 0.3);
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
    background: #d95e14;
    color: #ffffff;
    border: none;
    box-shadow: 0 4px 6px rgba(217, 94, 20, 0.2);
}

.btn-enterprise:hover {
    background: #b54a0d;
    color: #ffffff;
    box-shadow: 0 6px 10px rgba(217, 94, 20, 0.3);
}

.comparison-section {
    max-width: 1000px;
    margin: 40px auto;
    padding: 0 20px;
}

.comparison-table {
    width: 100%;
    border-collapse: collapse;
    background: #fff;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

.comparison-table th, .comparison-table td {
    padding: 16px;
    text-align: left;
    border-bottom: 1px solid #e2e8f0;
}

.comparison-table th {
    background: #f8fafc;
    font-weight: 700;
    color: #334155;
}

.comparison-table th.center, .comparison-table td.center {
    text-align: center;
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
    flex: 1 1 calc(50% - 30px);
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
</style>

<div class="row NL_main_banner">
    <div class="col-md-8 col-md-offset-2 NL_about">
        <h1>Pricing & Licensing</h1>
        <span>The Labs64.IO Ecosystem operates on a <strong>Dual Licensing</strong> model. This allows developers and startups to build freely with our open-source tools, while providing enterprises with the commercial protections, support, and managed services they require to scale securely.</span>
    </div>
</div>

<div class="pricing-section">
    <div class="container">
        <div class="pricing-grid">
            
            <!-- Community Edition -->
            <div class="pricing-card">
                <h2 class="pricing-title">Community Edition</h2>
                <div class="pricing-subtitle">Open Source & Free Forever. Perfect for developers, startups, and teams who want to self-host and manage their own infrastructure.</div>
                
                <a href="https://github.com/Labs64/labs64.io-workspace" class="btn-pricing btn-community"><i class="fa fa-github"></i> Get Started on GitHub</a>
            </div>

            <!-- Enterprise Edition -->
            <div class="pricing-card enterprise">
                <div class="badge-recommended">For Production</div>
                <h2 class="pricing-title">Enterprise Edition</h2>
                <div class="pricing-subtitle">Commercial License & Support. Designed for organizations requiring commercial protections, dedicated SLAs, and expert guidance.</div>
                
                <a href="mailto:sales@labs64.io" class="btn-pricing btn-enterprise">Contact Sales</a>
            </div>

        </div>
    </div>
</div>

<div class="comparison-section">
    <h2 style="text-align: center; margin-bottom: 40px; font-weight: 800; color: #853E29; font-size: 32px;">Feature Comparison</h2>
    <table class="comparison-table">
        <thead>
            <tr>
                <th>Feature</th>
                <th class="center">Community</th>
                <th class="center">Enterprise</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Source code access</td>
                <td class="center"><i class="fa fa-check text-success"></i></td>
                <td class="center"><i class="fa fa-check text-success"></i></td>
            </tr>
            <tr>
                <td>License</td>
                <td class="center">AGPL / Apache 2.0</td>
                <td class="center">Commercial (No copyleft)</td>
            </tr>
            <tr>
                <td>Self-hosted (Helm / ArgoCD)</td>
                <td class="center"><i class="fa fa-check text-success"></i></td>
                <td class="center"><i class="fa fa-check text-success"></i></td>
            </tr>
            <tr>
                <td>Support</td>
                <td class="center">Community (GitHub issues)</td>
                <td class="center">Dedicated SLAs & Support Channels</td>
            </tr>
            <tr>
                <td>Architectural consulting</td>
                <td class="center"><i class="fa fa-times text-muted"></i></td>
                <td class="center"><i class="fa fa-check text-success"></i></td>
            </tr>
            <tr>
                <td>Managed SaaS Deployment</td>
                <td class="center"><i class="fa fa-times text-muted"></i></td>
                <td class="center">Optional Add-on</td>
            </tr>
        </tbody>
    </table>
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
                    <p class="faq-answer">Instead of self-hosting, our expert team can deploy, manage, and scale the Labs64.IO ecosystem for you in a dedicated, secure cloud environment. <a href="mailto:info@labs64.io" style="color: #d95e14; font-weight: 600; text-decoration: none;">Contact us</a> for a custom quote.</p>
                </div>

                <div class="faq-item">
                    <h3 class="faq-question">What is Dual Licensing?</h3>
                    <p class="faq-answer">Dual licensing allows us to distribute our software under two different sets of terms. The AGPL ensures the code remains open, while the Commercial license allows enterprises to embed and extend our tools without open-sourcing their own proprietary code.</p>
                </div>

                <div class="faq-item">
                    <h3 class="faq-question">How do I upgrade from Community to Enterprise?</h3>
                    <p class="faq-answer">Upgrading is a seamless process of swapping out the community Docker images for enterprise-licensed images in your Helm configuration. Contact our sales team and we will provide you with the enterprise registry credentials.</p>
                </div>
            </div>
        </div>
    </div>
</div>
