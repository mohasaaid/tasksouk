const { createConnection, getRepository } = require("typeorm");
const Category = require("../src/models/Category");
const User = require("../src/models/User");
const CustomerProfile = require("../src/models/Customer");
const FreelancerProfile = require("../src/models/Freelancer");
const ServiceOffer = require("../src/models/ServiceOffer");
const ServiceRequest = require("../src/models/ServiceRequest");
const Review = require("../src/models/Review");
const KYCInfo = require("../src/models/KYCInfo");





// Define your connection settings (adjust to your configuration)
createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "tasksouk",
    password: "tasksouk",
    database: "TaskServiceDB",
    entities: [
        User,
        Category,
        CustomerProfile,
        FreelancerProfile,
        ServiceOffer,
        ServiceRequest,
        Review,
        KYCInfo
    ],
    synchronize: true,
    logging: false
}).then(async connection => {
    // await purgeDatabase();
    await insertMockData();
    console.log("Mock data has been inserted!");
}).catch(error => console.log(error));

async function purgeDatabase() {
    const reviewRepository = getRepository(Review);
    const serviceRequestRepository = getRepository(ServiceRequest);
    const serviceOfferRepository = getRepository(ServiceOffer);
    const kycInfoRepository = getRepository(KYCInfo);
    const customerProfileRepository = getRepository(CustomerProfile);
    const freelancerProfileRepository = getRepository(FreelancerProfile);
    const userRepository = getRepository(User);
    const categoryRepository = getRepository(Category);

    await reviewRepository.delete({});
    await serviceRequestRepository.delete({});
    await serviceOfferRepository.delete({});
    await kycInfoRepository.delete({});
    await customerProfileRepository.delete({});
    await freelancerProfileRepository.delete({});
    await userRepository.delete({});
    await categoryRepository.delete({});
}


async function insertMockData() {
    // Insert Categories
    const categoryRepository = getRepository(Category);
    const categories = [
        { name: "Electronics Repair", description: "Repair services for electronic devices", image_url: "http://example.com/electronics.png" },
        { name: "Plumbing", description: "Household plumbing services", image_url: "http://example.com/plumbing.png" },
        { name: "Gardening", description: "Garden maintenance and landscaping", image_url: "http://example.com/gardening.png" },
        { name: "House Cleaning", description: "General and deep house cleaning services", image_url: "http://example.com/cleaning.png" }
    ];
    await categoryRepository.save(categories.map(category => categoryRepository.create(category)));

    // Insert Users and Profiles
    const userRepository = getRepository(User);
    const users = [
        { email: "customer2@example.com", phone: "1234567890", role: 'customer', birthdate: new Date(1985, 4, 15) },
        { email: "freelancer2@example.com", phone: "0987654321", role: 'freelancer', birthdate: new Date(1990, 6, 20) },
        { email: "john.do2@example.com", phone: "3216549870", role: 'customer', birthdate: new Date(1980, 10, 25) },
        { email: "jane.smith2@example.com", phone: "6541237890", role: 'freelancer', birthdate: new Date(1992, 2, 5) }
    ];
    await userRepository.save(users.map(user => userRepository.create(user)));

    const customerProfileRepository = getRepository(CustomerProfile);
    const customerProfiles = [
        { userId: 1, preferences: "Quick service", transactionHistory: JSON.stringify([{ transactionId: 1, amount: "100.00" }]), paymentMethod: "Credit Card" },
        { userId: 3, preferences: "Eco-friendly products", transactionHistory: JSON.stringify([{ transactionId: 2, amount: "200.00" }]), paymentMethod: "PayPal" }
    ];
    await customerProfileRepository.save(customerProfiles.map(profile => customerProfileRepository.create(profile)));

    const freelancerProfileRepository = getRepository(FreelancerProfile);
    const freelancerProfiles = [
        { userId: 2, skills: ["Electronics", "Computers"], bio: "Experienced in electronics repair.", hourlyRate: 50.00 },
        { userId: 4, skills: ["Gardening", "Landscaping"], bio: "Professional gardener with a green thumb.", hourlyRate: 30.00 }
    ];
    await freelancerProfileRepository.save(freelancerProfiles.map(profile => freelancerProfileRepository.create(profile)));

    // Insert Service Offers
    const serviceOfferRepository = getRepository(ServiceOffer);
    const serviceOffers = [
        { freelancerId: 2, categoryId: 1, description: "Fast and reliable electronics repair.", minimumPrice: 49.99, workPhotos: ["http://example.com/photo1.jpg"] },
        { freelancerId: 4, categoryId: 3, description: "Beautiful gardening services that transform your home.", minimumPrice: 59.99, workPhotos: ["http://example.com/photo2.jpg"] }
    ];
    await serviceOfferRepository.save(serviceOffers.map(offer => serviceOfferRepository.create(offer)));

    // Insert Service Requests
    const serviceRequestRepository = getRepository(ServiceRequest);
    const serviceRequests = [
        { serviceOfferId: 1, customerId: 1, scheduledDate: new Date(), status: 'pending' },
        { serviceOfferId: 2, customerId: 3, scheduledDate: new Date(), status: 'confirmed' }
    ];
    await serviceRequestRepository.save(serviceRequests.map(request => serviceRequestRepository.create(request)));

    // Insert Reviews
    const reviewRepository = getRepository(Review);
    const reviews = [
        { reviewerId: 1, freelancerId: 2, rating: 5, comment: "Excellent work!", reviewDate: new Date() },
        { reviewerId: 3, freelancerId: 4,  rating: 4, comment: "Very professional and friendly.", reviewDate: new Date() }
    ];
    await reviewRepository.save(reviews.map(review => reviewRepository.create(review)));

    // Insert KYC Info
    const kycInfoRepository = getRepository(KYCInfo);
    const kycInfos = [
        { freelancerId: 2, documentType: "passport", documentNumber: "XX1234567", documentImage: "http://example.com/passport.jpg", verificationStatus: "pending" },
        { freelancerId: 4, documentType: "driver_license", documentNumber: "YY7654321", documentImage: "http://example.com/license.jpg", verificationStatus: "verified" }
    ];
    await kycInfoRepository.save(kycInfos.map(info => kycInfoRepository.create(info)));
}
