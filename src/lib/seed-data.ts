import connectDB from './mongodb'
import User from '@/models/User'
import Student from '@/models/Student'
import Company from '@/models/Company'
import Opportunity from '@/models/Opportunity'
import Application from '@/models/Application'
import bcrypt from 'bcryptjs'

export const seedData = async () => {
  try {
    await connectDB()
    
    // Clear existing data
    await User.deleteMany({})
    await Student.deleteMany({})
    await Company.deleteMany({})
    await Opportunity.deleteMany({})
    await Application.deleteMany({})

    console.log('🗑️  Cleared existing data')

    // Create users
    const hashedPassword = await bcrypt.hash('password123', 12)

    const users = await User.insertMany([
      {
        email: 'sarah.johnson@university.edu',
        password: hashedPassword,
        role: 'student',
        profile: {
          firstName: 'Sarah',
          lastName: 'Johnson',
          phone: '+1 (555) 123-4567',
          location: 'San Francisco, CA',
          bio: 'Computer Science student passionate about AI and machine learning',
          linkedin: 'https://linkedin.com/in/sarahjohnson',
          github: 'https://github.com/sarahjohnson'
        }
      },
      {
        email: 'michael.chen@university.edu',
        password: hashedPassword,
        role: 'faculty',
        profile: {
          firstName: 'Michael',
          lastName: 'Chen',
          phone: '+1 (555) 234-5678',
          location: 'San Francisco, CA',
          bio: 'Professor of Computer Science specializing in AI and Data Science'
        }
      },
      {
        email: 'lisa.rodriguez@university.edu',
        password: hashedPassword,
        role: 'placement',
        profile: {
          firstName: 'Lisa',
          lastName: 'Rodriguez',
          phone: '+1 (555) 345-6789',
          location: 'San Francisco, CA',
          bio: 'Placement Cell Coordinator with 10+ years of experience'
        }
      },
      {
        email: 'john.smith@techcorp.com',
        password: hashedPassword,
        role: 'recruiter',
        profile: {
          firstName: 'John',
          lastName: 'Smith',
          phone: '+1 (555) 456-7890',
          location: 'San Francisco, CA',
          bio: 'Senior Technical Recruiter at TechCorp'
        }
      },
      {
        email: 'alex.davis@university.edu',
        password: hashedPassword,
        role: 'student',
        profile: {
          firstName: 'Alex',
          lastName: 'Davis',
          phone: '+1 (555) 567-8901',
          location: 'San Francisco, CA',
          bio: 'Software Engineering student interested in full-stack development'
        }
      },
      {
        email: 'emma.wilson@university.edu',
        password: hashedPassword,
        role: 'student',
        profile: {
          firstName: 'Emma',
          lastName: 'Wilson',
          phone: '+1 (555) 678-9012',
          location: 'San Francisco, CA',
          bio: 'Data Science student with expertise in Python and R'
        }
      }
    ])

    console.log('👥 Created users')

    // Create students
    const students = await Student.insertMany([
      {
        userId: users[0]._id,
        studentId: 'STU001',
        academicInfo: {
          university: 'University of California, San Francisco',
          department: 'Computer Science',
          program: 'Bachelor of Science',
          year: 3,
          cgpa: 8.5,
          expectedGraduation: new Date('2024-06-01')
        },
        skills: [
          { name: 'JavaScript', level: 'advanced', category: 'technical' },
          { name: 'Python', level: 'expert', category: 'technical' },
          { name: 'React', level: 'advanced', category: 'technical' },
          { name: 'Machine Learning', level: 'intermediate', category: 'technical' },
          { name: 'Communication', level: 'advanced', category: 'soft' }
        ],
        experience: [
          {
            title: 'Software Development Intern',
            company: 'TechStart Inc.',
            type: 'internship',
            startDate: new Date('2023-06-01'),
            endDate: new Date('2023-08-31'),
            description: 'Developed web applications using React and Node.js',
            skills: ['React', 'Node.js', 'MongoDB', 'JavaScript']
          }
        ],
        certifications: [
          {
            name: 'AWS Certified Developer',
            issuer: 'Amazon Web Services',
            issueDate: new Date('2023-03-15'),
            credentialId: 'AWS-DEV-123456'
          }
        ],
        preferences: {
          jobTypes: ['internship', 'full-time'],
          locations: ['San Francisco', 'New York', 'Remote'],
          salaryRange: { min: 80000, max: 120000, currency: 'USD' },
          workMode: 'hybrid',
          companySize: 'medium'
        },
        achievements: [
          {
            title: 'Dean\'s List',
            description: 'Maintained GPA above 3.5 for consecutive semesters',
            date: new Date('2023-05-15'),
            category: 'academic'
          }
        ],
        documents: [
          {
            type: 'resume',
            name: 'Sarah_Johnson_Resume.pdf',
            url: '/documents/sarah_johnson_resume.pdf',
            uploadedAt: new Date()
          }
        ]
      },
      {
        userId: users[4]._id,
        studentId: 'STU002',
        academicInfo: {
          university: 'University of California, San Francisco',
          department: 'Software Engineering',
          program: 'Bachelor of Science',
          year: 4,
          cgpa: 8.2,
          expectedGraduation: new Date('2024-05-01')
        },
        skills: [
          { name: 'Java', level: 'expert', category: 'technical' },
          { name: 'Spring Boot', level: 'advanced', category: 'technical' },
          { name: 'Angular', level: 'intermediate', category: 'technical' },
          { name: 'SQL', level: 'advanced', category: 'technical' }
        ],
        preferences: {
          jobTypes: ['full-time'],
          locations: ['San Francisco', 'Seattle'],
          salaryRange: { min: 90000, max: 130000, currency: 'USD' },
          workMode: 'onsite',
          companySize: 'enterprise'
        }
      },
      {
        userId: users[5]._id,
        studentId: 'STU003',
        academicInfo: {
          university: 'University of California, San Francisco',
          department: 'Data Science',
          program: 'Master of Science',
          year: 2,
          cgpa: 9.1,
          expectedGraduation: new Date('2024-12-01')
        },
        skills: [
          { name: 'Python', level: 'expert', category: 'technical' },
          { name: 'R', level: 'advanced', category: 'technical' },
          { name: 'TensorFlow', level: 'intermediate', category: 'technical' },
          { name: 'Statistics', level: 'expert', category: 'technical' }
        ],
        preferences: {
          jobTypes: ['internship', 'full-time'],
          locations: ['San Francisco', 'Remote'],
          salaryRange: { min: 95000, max: 140000, currency: 'USD' },
          workMode: 'hybrid',
          companySize: 'medium'
        }
      }
    ])

    console.log('🎓 Created students')

    // Create companies
    const companies = await Company.insertMany([
      {
        name: 'TechCorp Solutions',
        description: 'Leading technology company specializing in AI and cloud computing solutions for enterprises worldwide.',
        website: 'https://techcorp.com',
        industry: 'Technology',
        size: 'large',
        founded: 2010,
        headquarters: {
          address: '123 Tech Street',
          city: 'San Francisco',
          state: 'California',
          country: 'United States',
          zipCode: '94105'
        },
        contact: {
          email: 'careers@techcorp.com',
          phone: '+1 (555) 123-4567',
          linkedin: 'https://linkedin.com/company/techcorp'
        },
        culture: {
          values: ['Innovation', 'Collaboration', 'Excellence', 'Integrity'],
          mission: 'To empower businesses through cutting-edge technology solutions',
          vision: 'A world where technology seamlessly integrates with human potential',
          benefits: ['Health Insurance', '401k Matching', 'Flexible Hours', 'Remote Work']
        },
        verification: {
          isVerified: true,
          verifiedAt: new Date(),
          verifiedBy: users[2]._id
        },
        recruiters: [users[3]._id],
        rating: {
          average: 4.5,
          count: 25,
          breakdown: {
            culture: 4.6,
            compensation: 4.4,
            workLifeBalance: 4.3,
            careerGrowth: 4.7,
            management: 4.5
          }
        }
      },
      {
        name: 'DataFlow Inc.',
        description: 'Data analytics company providing insights and solutions for data-driven decision making.',
        website: 'https://dataflow.com',
        industry: 'Data Analytics',
        size: 'medium',
        founded: 2018,
        headquarters: {
          address: '456 Data Avenue',
          city: 'San Francisco',
          state: 'California',
          country: 'United States',
          zipCode: '94107'
        },
        contact: {
          email: 'hr@dataflow.com',
          phone: '+1 (555) 234-5678'
        },
        culture: {
          values: ['Data-Driven', 'Transparency', 'Growth', 'Innovation'],
          mission: 'Transforming data into actionable insights',
          benefits: ['Health Insurance', 'Stock Options', 'Learning Budget']
        },
        verification: {
          isVerified: true,
          verifiedAt: new Date(),
          verifiedBy: users[2]._id
        }
      },
      {
        name: 'StartupXYZ',
        description: 'Fast-growing startup in the fintech space, revolutionizing digital payments.',
        website: 'https://startupxyz.com',
        industry: 'Fintech',
        size: 'startup',
        founded: 2021,
        headquarters: {
          address: '789 Innovation Blvd',
          city: 'San Francisco',
          state: 'California',
          country: 'United States',
          zipCode: '94108'
        },
        contact: {
          email: 'jobs@startupxyz.com'
        },
        culture: {
          values: ['Agility', 'Innovation', 'Customer Focus', 'Teamwork'],
          mission: 'Making financial services accessible to everyone',
          benefits: ['Equity', 'Health Insurance', 'Flexible PTO']
        },
        verification: {
          isVerified: false
        }
      }
    ])

    console.log('🏢 Created companies')

    // Create opportunities
    const opportunities = await Opportunity.insertMany([
      {
        title: 'Software Engineer Intern',
        description: 'Join our engineering team to build scalable web applications using modern technologies. You\'ll work on real projects and gain hands-on experience with our tech stack.',
        type: 'internship',
        category: 'Software Development',
        company: {
          name: 'TechCorp Solutions',
          id: companies[0]._id,
          logo: '/logos/techcorp.png',
          website: 'https://techcorp.com',
          size: 'large',
          industry: 'Technology'
        },
        location: {
          city: 'San Francisco',
          state: 'California',
          country: 'United States',
          isRemote: false,
          workMode: 'hybrid'
        },
        requirements: {
          education: ['Computer Science', 'Software Engineering', 'Information Technology'],
          experience: { min: 0, max: 2, type: 'years' },
          skills: ['JavaScript', 'React', 'Node.js', 'Python'],
          languages: [
            { name: 'English', level: 'advanced' }
          ]
        },
        benefits: {
          salary: { min: 25, max: 35, currency: 'USD', period: 'hourly' },
          perks: ['Mentorship Program', 'Lunch Provided', 'Gym Access'],
          benefits: ['Health Insurance', '401k Matching']
        },
        application: {
          deadline: new Date('2024-03-15'),
          startDate: new Date('2024-06-01'),
          duration: 12,
          process: [
            { stage: 'Application Review', description: 'Initial screening of applications', estimatedDays: 3 },
            { stage: 'Technical Interview', description: 'Coding challenge and technical discussion', estimatedDays: 7 },
            { stage: 'Final Interview', description: 'Cultural fit and final assessment', estimatedDays: 10 }
          ],
          requirements: ['Resume', 'Cover Letter', 'Portfolio Link']
        },
        status: 'active',
        postedBy: users[3]._id,
        approvedBy: users[2]._id,
        approvedAt: new Date(),
        isFeatured: true,
        tags: ['internship', 'software', 'react', 'javascript']
      },
      {
        title: 'Data Science Intern',
        description: 'Work with our data science team to analyze large datasets and build machine learning models. Perfect for students interested in AI and analytics.',
        type: 'internship',
        category: 'Data Science',
        company: {
          name: 'DataFlow Inc.',
          id: companies[1]._id,
          website: 'https://dataflow.com',
          size: 'medium',
          industry: 'Data Analytics'
        },
        location: {
          city: 'San Francisco',
          state: 'California',
          country: 'United States',
          isRemote: true,
          workMode: 'remote'
        },
        requirements: {
          education: ['Data Science', 'Statistics', 'Computer Science'],
          experience: { min: 0, max: 1, type: 'years' },
          skills: ['Python', 'R', 'SQL', 'Machine Learning'],
          languages: [
            { name: 'English', level: 'advanced' }
          ]
        },
        benefits: {
          salary: { min: 30, max: 40, currency: 'USD', period: 'hourly' },
          perks: ['Learning Budget', 'Flexible Hours'],
          benefits: ['Health Insurance']
        },
        application: {
          deadline: new Date('2024-04-01'),
          startDate: new Date('2024-07-01'),
          duration: 6,
          process: [
            { stage: 'Application Review', description: 'Resume and portfolio review', estimatedDays: 5 },
            { stage: 'Technical Assessment', description: 'Data analysis challenge', estimatedDays: 10 },
            { stage: 'Interview', description: 'Technical and behavioral interview', estimatedDays: 14 }
          ],
          requirements: ['Resume', 'Portfolio', 'GitHub Profile']
        },
        status: 'active',
        postedBy: users[2]._id,
        approvedBy: users[2]._id,
        approvedAt: new Date(),
        tags: ['internship', 'data-science', 'python', 'machine-learning']
      },
      {
        title: 'Full Stack Developer',
        description: 'Join our fast-paced startup as a full-stack developer. You\'ll work on both frontend and backend development using cutting-edge technologies.',
        type: 'full-time',
        category: 'Software Development',
        company: {
          name: 'StartupXYZ',
          id: companies[2]._id,
          website: 'https://startupxyz.com',
          size: 'startup',
          industry: 'Fintech'
        },
        location: {
          city: 'San Francisco',
          state: 'California',
          country: 'United States',
          isRemote: false,
          workMode: 'onsite'
        },
        requirements: {
          education: ['Computer Science', 'Software Engineering'],
          experience: { min: 1, max: 3, type: 'years' },
          skills: ['JavaScript', 'React', 'Node.js', 'PostgreSQL'],
          languages: [
            { name: 'English', level: 'advanced' }
          ]
        },
        benefits: {
          salary: { min: 80000, max: 120000, currency: 'USD', period: 'yearly' },
          perks: ['Equity', 'Flexible PTO', 'Learning Budget'],
          benefits: ['Health Insurance', 'Dental', 'Vision']
        },
        application: {
          deadline: new Date('2024-05-01'),
          startDate: new Date('2024-08-01'),
          process: [
            { stage: 'Application Review', description: 'Initial screening', estimatedDays: 3 },
            { stage: 'Technical Interview', description: 'Coding challenge', estimatedDays: 7 },
            { stage: 'System Design', description: 'System design discussion', estimatedDays: 10 },
            { stage: 'Final Interview', description: 'Cultural fit interview', estimatedDays: 14 }
          ],
          requirements: ['Resume', 'Cover Letter', 'GitHub Profile']
        },
        status: 'active',
        postedBy: users[2]._id,
        tags: ['full-time', 'full-stack', 'startup', 'fintech']
      }
    ])

    console.log('💼 Created opportunities')

    // Create applications
    const applications = await Application.insertMany([
      {
        studentId: students[0]._id,
        opportunityId: opportunities[0]._id,
        status: 'submitted',
        coverLetter: 'I am excited to apply for the Software Engineer Intern position at TechCorp Solutions. With my strong background in JavaScript and React, I believe I would be a valuable addition to your team.',
        resume: {
          url: '/documents/sarah_johnson_resume.pdf',
          name: 'Sarah_Johnson_Resume.pdf',
          uploadedAt: new Date()
        },
        additionalDocuments: [
          {
            type: 'transcript',
            name: 'Sarah_Johnson_Transcript.pdf',
            url: '/documents/sarah_johnson_transcript.pdf',
            uploadedAt: new Date()
          }
        ],
        answers: [
          {
            question: 'Why are you interested in this position?',
            answer: 'I am passionate about building scalable web applications and would love to contribute to TechCorp\'s innovative projects.'
          }
        ],
        timeline: [
          {
            status: 'submitted',
            date: new Date(),
            updatedBy: students[0].userId
          }
        ]
      },
      {
        studentId: students[2]._id,
        opportunityId: opportunities[1]._id,
        status: 'under-review',
        coverLetter: 'As a Data Science student with expertise in Python and machine learning, I am excited about the opportunity to contribute to DataFlow\'s analytics projects.',
        resume: {
          url: '/documents/emma_wilson_resume.pdf',
          name: 'Emma_Wilson_Resume.pdf',
          uploadedAt: new Date()
        },
        timeline: [
          {
            status: 'submitted',
            date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            updatedBy: students[2].userId
          },
          {
            status: 'under-review',
            date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            note: 'Application under review by hiring team',
            updatedBy: users[2]._id
          }
        ]
      },
      {
        studentId: students[1]._id,
        opportunityId: opportunities[2]._id,
        status: 'interview',
        coverLetter: 'I am excited about the opportunity to join StartupXYZ as a Full Stack Developer. My experience with Java and Spring Boot aligns well with your requirements.',
        resume: {
          url: '/documents/alex_davis_resume.pdf',
          name: 'Alex_Davis_Resume.pdf',
          uploadedAt: new Date()
        },
        interview: {
          scheduled: new Date('2024-02-15T14:00:00Z'),
          type: 'video',
          meetingLink: 'https://meet.google.com/abc-defg-hij',
          interviewer: users[3]._id
        },
        timeline: [
          {
            status: 'submitted',
            date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
            updatedBy: students[1].userId
          },
          {
            status: 'shortlisted',
            date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
            note: 'Application shortlisted for interview',
            updatedBy: users[2]._id
          },
          {
            status: 'interview',
            date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            note: 'Interview scheduled for February 15th',
            updatedBy: users[3]._id
          }
        ]
      }
    ])

    console.log('📝 Created applications')

    // Update opportunity application counts
    for (const opportunity of opportunities) {
      const applicationCount = applications.filter(app => 
        app.opportunityId.toString() === opportunity._id.toString()
      ).length
      
      await Opportunity.findByIdAndUpdate(opportunity._id, {
        applicationsCount: applicationCount,
        applications: applications
          .filter(app => app.opportunityId.toString() === opportunity._id.toString())
          .map(app => app._id)
      })
    }

    console.log('✅ Seed data created successfully!')
    console.log(`📊 Summary:`)
    console.log(`   - Users: ${users.length}`)
    console.log(`   - Students: ${students.length}`)
    console.log(`   - Companies: ${companies.length}`)
    console.log(`   - Opportunities: ${opportunities.length}`)
    console.log(`   - Applications: ${applications.length}`)

    return {
      users,
      students,
      companies,
      opportunities,
      applications
    }

  } catch (error) {
    console.error('❌ Error seeding data:', error)
    throw error
  }
}

export default seedData
