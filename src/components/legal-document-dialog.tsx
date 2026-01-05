import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

interface LegalDocumentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: 'privacy' | 'terms';
}

export function LegalDocumentDialog({ open, onOpenChange, type }: LegalDocumentDialogProps) {
  const title = type === 'privacy' ? 'Privacy Policy' : 'Terms of Service';
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[80vh]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-full pr-4">
          {type === 'privacy' ? <PrivacyContent /> : <TermsContent />}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

function PrivacyContent() {
  return (
    <div className="prose prose-sm max-w-none space-y-4 text-sm">
      <p className="text-muted-foreground"><strong>Last Updated:</strong> January 2025</p>
      
      <section>
        <h2 className="text-lg font-semibold mb-2">Introduction</h2>
        <p>
          Welcome to Gurmaio ("we," "our," or "us"). We are committed to protecting your privacy and being transparent about how we collect, use, and share your information.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">1. Information We Collect</h2>
        
        <h3 className="text-md font-medium mt-3 mb-1">1.1 Information You Provide Directly</h3>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Account Information:</strong> GitHub username, email address, profile picture (via GitHub OAuth)</li>
          <li><strong>Dietary Preferences:</strong> Dietary restrictions, allergens, cuisine preferences</li>
          <li><strong>Physical Information (optional):</strong> Weight, height, age, sex, activity level (for calorie calculations)</li>
          <li><strong>Budget Information:</strong> Budget amount and period (daily/weekly)</li>
          <li><strong>Meal Plan Data:</strong> Generated meal plans, saved meal plans, meal ratings</li>
          <li><strong>Shopping Lists:</strong> Ingredient lists with owned/deleted status</li>
        </ul>

        <h3 className="text-md font-medium mt-3 mb-1">1.2 Information We Collect Automatically</h3>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Usage Data:</strong> How you interact with the app (features used, generation frequency)</li>
          <li><strong>Device Information:</strong> Browser type, operating system, device type</li>
          <li><strong>Log Data:</strong> IP address, access times, pages viewed, errors encountered</li>
        </ul>

        <h3 className="text-md font-medium mt-3 mb-1">1.3 Information from Third Parties</h3>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>GitHub OAuth:</strong> We receive your GitHub username, email, and avatar URL when you log in</li>
          <li><strong>AI Services:</strong> We send your dietary preferences and meal requirements to OpenAI GPT-4 to generate meal suggestions (anonymized, no personal identifiers sent)</li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">2. How We Use Your Information</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Generate personalized meal plans based on your budget, dietary preferences, and nutritional goals</li>
          <li>Calculate nutrition (calories, protein, carbohydrates, fats)</li>
          <li>Estimate costs based on average market prices</li>
          <li>Generate shopping lists by aggregating ingredients</li>
          <li>Save your data for future sessions</li>
          <li>Improve our service through usage analysis</li>
          <li>Ensure security and prevent fraud</li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">3. How We Share Your Information</h2>
        
        <h3 className="text-md font-medium mt-3 mb-1">Third-Party Service Providers</h3>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>OpenAI:</strong> Your dietary preferences, budget, and nutritional goals are sent to OpenAI GPT-4. <strong>No personal identifiers (name, email, GitHub username) are sent.</strong></li>
          <li><strong>GitHub:</strong> For authentication via GitHub OAuth</li>
          <li><strong>Hosting Provider:</strong> Data stored securely in database infrastructure</li>
        </ul>

        <h3 className="text-md font-medium mt-3 mb-1">We Do NOT Share Your Data With:</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>❌ Advertisers or marketing companies</li>
          <li>❌ Insurance companies</li>
          <li>❌ Healthcare providers</li>
          <li>❌ Data brokers</li>
          <li>❌ Social media platforms (except GitHub for authentication)</li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">4. Data Storage and Security</h2>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Encryption:</strong> All data transmitted between your device and our servers is encrypted using TLS/SSL</li>
          <li><strong>Access Controls:</strong> Only authorized systems have access to user data</li>
          <li><strong>Authentication:</strong> GitHub OAuth provides secure authentication</li>
          <li><strong>No Payment Data:</strong> We do not collect or store credit card or payment information</li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">5. Your Rights and Choices</h2>
        
        <h3 className="text-md font-medium mt-3 mb-1">Delete Your Data (Right to Erasure)</h3>
        <p>You can permanently delete your account and all associated data at any time:</p>
        <ol className="list-decimal list-inside space-y-1 mt-2">
          <li>Click "Delete My Data" in the footer</li>
          <li>Review the deletion confirmation dialog</li>
          <li>Click "Yes, Delete Everything"</li>
          <li>Your data will be immediately deleted</li>
        </ol>
        
        <p className="mt-2"><strong>What Gets Deleted:</strong></p>
        <ul className="list-disc list-inside space-y-1">
          <li>Your user profile and preferences</li>
          <li>All saved meal plans</li>
          <li>Meal ratings and history</li>
          <li>Shopping lists and item tracking</li>
          <li>All associated data in our system</li>
        </ul>

        <p className="mt-2 font-medium">This complies with GDPR Article 17 (Right to Erasure) and CCPA Section 1798.105 (Right to Delete).</p>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">6. Children's Privacy</h2>
        <p>
          Gurmaio is <strong>not intended for children under 13 years old</strong>. We do not knowingly collect information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately at <strong>support@gurmaio.app</strong> and we will delete it.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">7. GDPR Rights (EU Users)</h2>
        <p>If you are located in the European Economic Area (EEA), you have the following rights:</p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Right to Access:</strong> Request a copy of your personal data</li>
          <li><strong>Right to Rectification:</strong> Correct inaccurate personal data</li>
          <li><strong>Right to Erasure:</strong> Request deletion of your personal data</li>
          <li><strong>Right to Restriction:</strong> Limit how we use your personal data</li>
          <li><strong>Right to Portability:</strong> Receive your data in a machine-readable format</li>
          <li><strong>Right to Object:</strong> Object to processing of your personal data</li>
        </ul>
        <p className="mt-2">To exercise these rights, contact us at <strong>support@gurmaio.app</strong></p>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">8. Important Disclaimers</h2>
        
        <h3 className="text-md font-medium mt-3 mb-1">Not Medical Advice</h3>
        <p>
          Gurmaio provides meal planning suggestions <strong>for informational purposes only</strong>. This is <strong>NOT medical, nutritional, or health advice</strong>. Always consult a qualified healthcare professional before making significant dietary changes.
        </p>

        <h3 className="text-md font-medium mt-3 mb-1">Estimates Only</h3>
        <p>
          All nutrition values and cost estimates are <strong>approximations</strong> based on USDA nutrition databases and average grocery prices. <strong>Actual values may vary</strong> based on brands, stores, preparation methods, and regional pricing.
        </p>

        <h3 className="text-md font-medium mt-3 mb-1">AI Usage</h3>
        <p>
          We use <strong>AI (OpenAI GPT-4)</strong> to suggest meal combinations. However:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>AI does <strong>NOT</strong> calculate nutrition values (deterministic algorithms do)</li>
          <li>AI does <strong>NOT</strong> calculate costs (deterministic algorithms do)</li>
          <li>AI <strong>ONLY</strong> suggests ingredient combinations</li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">9. Contact Us</h2>
        <p>
          If you have questions about this Privacy Policy or your data, please contact us at:
        </p>
        <p className="mt-2">
          <strong>Email:</strong> support@gurmaio.app
        </p>
        <p className="mt-1 text-muted-foreground">
          We will respond to your inquiry within 30 days.
        </p>
      </section>
    </div>
  );
}

function TermsContent() {
  return (
    <div className="prose prose-sm max-w-none space-y-4 text-sm">
      <p className="text-muted-foreground"><strong>Last Updated:</strong> January 2025</p>
      
      <section>
        <h2 className="text-lg font-semibold mb-2">Agreement to Terms</h2>
        <p>
          By accessing or using Gurmaio ("the App," "Service," "we," "us," or "our"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, do not use the App.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">1. Description of Service</h2>
        
        <h3 className="text-md font-medium mt-3 mb-1">What Gurmaio Does</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>Generates personalized meal plans based on your budget and dietary preferences</li>
          <li>Calculates estimated nutrition values (calories, protein, carbohydrates, fats)</li>
          <li>Estimates ingredient and meal costs</li>
          <li>Creates shopping lists</li>
          <li>Uses AI (OpenAI GPT-4) to suggest meal combinations</li>
        </ul>

        <h3 className="text-md font-medium mt-3 mb-1">What Gurmaio is NOT</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>❌ Medical advice or treatment</li>
          <li>❌ Nutritional counseling</li>
          <li>❌ A substitute for professional healthcare providers</li>
          <li>❌ A guarantee of specific health outcomes</li>
          <li>❌ A meal delivery service</li>
          <li>❌ A grocery store or price comparison tool</li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">2. Eligibility</h2>
        <p>
          You must be <strong>at least 13 years old</strong> to use Gurmaio. If you are under 18, you must have parental or guardian consent to use the Service.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">3. User Responsibilities</h2>
        
        <h3 className="text-md font-medium mt-3 mb-1">Your Obligations</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>Provide accurate dietary information (allergies, restrictions)</li>
          <li>Use the App for lawful purposes only</li>
          <li>Consult healthcare professionals for medical/dietary advice</li>
          <li>Verify ingredient safety before consumption (especially for allergies)</li>
          <li>Keep your account credentials secure</li>
          <li>Comply with all applicable laws and regulations</li>
        </ul>

        <h3 className="text-md font-medium mt-3 mb-1">Prohibited Conduct</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>Using the App if you have medical conditions requiring supervised diets (without professional guidance)</li>
          <li>Relying solely on the App for managing serious allergies or health conditions</li>
          <li>Misusing, hacking, or attempting to gain unauthorized access to the Service</li>
          <li>Using automated scripts or bots to access the Service</li>
          <li>Violating any laws or regulations</li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">4. Disclaimers and Limitations</h2>
        
        <h3 className="text-md font-medium mt-3 mb-1">No Medical Advice</h3>
        <p className="font-semibold">
          IMPORTANT: Gurmaio provides meal planning suggestions for informational purposes only. This is NOT medical, nutritional, or health advice.
        </p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li>We are NOT healthcare providers</li>
          <li>We do NOT diagnose, treat, or prevent any medical conditions</li>
          <li>We do NOT provide personalized medical or nutritional counseling</li>
        </ul>
        <p className="mt-2 font-medium">
          You MUST consult qualified healthcare professionals before making significant dietary changes or managing medical conditions through diet.
        </p>

        <h3 className="text-md font-medium mt-3 mb-1">Estimates Only</h3>
        <p>All values provided by Gurmaio are <strong>estimates</strong> and may not be accurate.</p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li><strong>Nutrition Values:</strong> Based on USDA databases; may vary by brand and preparation</li>
          <li><strong>Cost Estimates:</strong> Based on average prices; actual costs may differ significantly by store, location, and season</li>
          <li><strong>Ingredient Suggestions:</strong> AI-generated; may contain errors or inappropriate combinations</li>
        </ul>

        <h3 className="text-md font-medium mt-3 mb-1">AI-Generated Content</h3>
        <p>
          Meal suggestions are AI-assisted (using OpenAI GPT-4). AI-generated content may contain errors or inaccuracies and is NOT reviewed by nutritionists or chefs. <strong>You use AI suggestions at your own risk.</strong>
        </p>

        <h3 className="text-md font-medium mt-3 mb-1">No Guarantees</h3>
        <p>We make NO guarantees regarding:</p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li>Weight loss or weight gain</li>
          <li>Health improvements or fitness outcomes</li>
          <li>Accuracy of nutrition or cost estimates</li>
          <li>Availability or price of ingredients</li>
          <li>Suitability for your specific health needs</li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">5. Limitation of Liability</h2>
        
        <h3 className="text-md font-medium mt-3 mb-1">Use at Your Own Risk</h3>
        <p className="font-semibold">
          YOU USE GURMAIO AT YOUR OWN RISK. The Service is provided "AS IS" and "AS AVAILABLE" without warranties of any kind.
        </p>

        <h3 className="text-md font-medium mt-3 mb-1">No Liability for Health Outcomes</h3>
        <p>To the maximum extent permitted by law, we are NOT liable for:</p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li>Adverse health effects from following meal plans</li>
          <li>Allergic reactions or food sensitivities</li>
          <li>Medical conditions worsened by dietary changes</li>
          <li>Inaccurate nutrition information</li>
          <li>Food poisoning or illness</li>
          <li>Grocery costs exceeding estimates</li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">6. Intellectual Property</h2>
        <p>
          Gurmaio and all its content (code, design, algorithms, logos, text) are owned by us or our licensors and protected by copyright, trademark, and other intellectual property laws.
        </p>
        <p className="mt-2">
          You retain ownership of your profile information, saved meal plans, and meal ratings. By using the Service, you grant us a non-exclusive, worldwide, royalty-free license to store and display your content.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">7. Privacy and Data</h2>
        <p>
          Your use of Gurmaio is governed by our Privacy Policy. By using the Service, you consent to our collection, use, and sharing of your information as described in the Privacy Policy.
        </p>
        <p className="mt-2">
          You may delete your account and all associated data at any time through the App. Upon deletion, your profile, meal plans, ratings, and shopping lists will be permanently removed. This action is irreversible.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">8. Third-Party Services</h2>
        <p>Gurmaio integrates with:</p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li><strong>GitHub OAuth:</strong> For authentication</li>
          <li><strong>OpenAI GPT-4:</strong> For AI meal suggestions</li>
          <li><strong>GitHub Spark Platform:</strong> For hosting and data storage</li>
        </ul>
        <p className="mt-2">
          Your use of third-party services is subject to their respective terms and privacy policies. We are not responsible for third-party service availability, data practices, or service quality.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">9. Modifications to Service</h2>
        <p>We reserve the right to:</p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li>Add, modify, or remove features at any time</li>
          <li>Change pricing or introduce paid features</li>
          <li>Suspend or discontinue the Service</li>
          <li>Update algorithms or data sources</li>
        </ul>
        <p className="mt-2">
          Your continued use of the Service after changes constitutes acceptance of the modified Terms.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">10. Termination</h2>
        <p>
          You may stop using the Service at any time by logging out, deleting your account, or uninstalling the App.
        </p>
        <p className="mt-2">
          We reserve the right to suspend or terminate your account for violating these Terms, discontinue the Service for any reason, or refuse service to anyone at any time.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">11. Contact Information</h2>
        <p>If you have questions about these Terms, contact us:</p>
        <p className="mt-2">
          <strong>Email:</strong> support@gurmaio.app
        </p>
        <p className="mt-1 text-muted-foreground">
          We will respond to inquiries within 30 days.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">12. Acknowledgment</h2>
        <p>By using Gurmaio, you acknowledge that:</p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li>You have read and understood these Terms</li>
          <li>You agree to be bound by these Terms</li>
          <li>You understand this is NOT medical advice</li>
          <li>You understand all values are estimates</li>
          <li>You will consult healthcare professionals for dietary advice</li>
          <li>You use the Service at your own risk</li>
        </ul>
      </section>
    </div>
  );
}
