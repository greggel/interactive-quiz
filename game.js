const textElement = document.getElementById('text');
const svgDiv = document.getElementById('svgDiv');
const optionButtonsElement = document.getElementById('option-buttons');
const nextBtnElement = document.querySelector('.next');
const finalSceneElement = document.getElementById('finalScene');

let state = {
    
}

let questionIndex = 0;

function startGame() {
    showTextNode(questionIndex);
    
}

function showTextNode(textNodeIndex) {
    while(optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild);
    }
    nextBtnElement.style.visibility = 'hidden';
    nextBtnElement.style.display = 'none';
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex);
    textElement.innerText = textNode.text;
    svgDiv.innerHTML = `<img src="assets/svg${textNode.id}.svg">`;
    
    
    if (textNode.type === 'intro') {
        console.log('intro')
        nextBtnElement.innerText = 'Start';
        nextBtnElement.style.visibility = 'visible';
        nextBtnElement.style.display = "block";
    }
    else if (textNode.options) {
    textNode.options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option.text;
        button.classList.add('option-btn');
        
        button.addEventListener('click', () => {
            option.selected = !option.selected;
            if (textNode.type === 'single') {
                questionIndex++;
                
                showTextNode(questionIndex);
            } else if (textNode.type === 'multiple') {
                button.classList.toggle('selected');
                var showBtn = false;
                console.log(showBtn)
                for (var i = 0; i < textNode.options.length; i++) {
                    showBtn = showBtn || textNode.options[i].selected;
                }
                if (showBtn === true) {
                    nextBtnElement.style.display = "block";
                    nextBtnElement.style.visibility = "visible";
                    nextBtnElement.innerText = 'Next';
                } else {
                    nextBtnElement.style.visibility = "hidden";
                    nextBtnElement.style.display = 'none';
                }
                
            } 
        });
        optionButtonsElement.appendChild(button);
        
    })
    } else if (textNode.type === 'final') {
         textNodes.forEach(textNode => {
            if (textNode.options) {
                optionButtonsElement.innerHTML += `<div class="finalSceneNode">
                                                <div class="finalText">${textNode.text}</div>
                                                <div class="finalOptionsContainer">${printOptionsFinal(textNode.options)}</div>
                                            </div>`;            
            }
        })
        
        nextBtnElement.style.visibility = 'visible';
        nextBtnElement.style.display = 'block';
        nextBtnElement.innerText = 'Restart';
        
    }
    
    console.log(questionIndex);
}

nextBtnElement.addEventListener('click', () => {
    questionIndex++;
    if (questionIndex > textNodes.length -1) {
        location.reload();
    }
    showTextNode(questionIndex);
})

function printOptionsFinal(optionsArray) {
    let toInsert = '';
    for (let i = 0; i < optionsArray.length; i++) {
        toInsert += optionsArray[i].selected ? `<div>
                                                    <div class="finalOption selected">${optionsArray[i].text}:   
                                                    <ul>${showPlaces(optionsArray[i])}</ul>
                                                    </div>
                                                    
                                                </div$>`
                                                 :
                                               `<div>
                                                    <div class="finalOption">${optionsArray[i].text}  
                                                    <ul>${showPlaces(optionsArray[i])}</ul>
                                                    </div>
                                                    
                                                </div>`
    }
    return toInsert
}

function showPlaces(singleOption) {
    let toInsert = '';
    if (singleOption.flags) {
        for (let i = 0; i < singleOption.flags.length; i++) {
        toInsert += `<li>${singleOption.flags[i]}</li>`
    }
    }
    
    return toInsert
}

function selectOption(option) {

}



let textNodes = [
    {
        id: 0,
        type: 'intro',
        text: "Ready to talk security?"
    },
    {
        id: 1,
        type: 'multiple',
        text: 'Do you have an IT Security, or Security focused team with an IT Security budget?',
        options: [
            {
                text: 'Yes, we have an IT Security dedicated team with an IT Security budget',
                selected: false
            },
            {
                text: 'Yes, we have staff dedicated to IT Security, but not a IT Security Team',
                selected: false
            }
        ]
    },
    {
        id: 2,
        type: 'single',
        text: 'How many employees are employed by your organization including any contractors?',
        options: [
            {
                text: '0-100',
                selected: false
            },
            {
                text: '100-1000',
                selected: false
            },
            {
                text: '1000-5000',
                selected: false
            },
            {
                text: '5000-10,000',
                selected: false
            },
            {
                text: '10,000-100,000',
                selected: false
            },
            {
                text: '100,000-500,000',
                selected: false
            },
            {
                text: '500,000+',
                selected: false
            }
        ]
    },
    {
        id: 3,
        type: 'multiple',
        text: 'Does your organization have a pre-employment screening policy for employees and contractors? What is that process? ',
        options: [
            {
                text: 'Basic Background Check',
                //flags: ['Internal Provider', 'External Provider'],
                selected: false
            },
            {
                text: 'Criminal Background Check',
                //flags: ['Internal Provider', 'External Provider'],
                selected: false
            },
            {
                text: 'Prior Work and Education Verification Check',
                //flags: ['Internal Provider', 'External Provider'],
                selected: false
            },
            {
                text: 'Job Knowledge Skills Asssessment',
                selected: false
            },
            {
                text: 'Cognitive Ability Test',
                selected: false
            },
            {
                text: 'Personality Test',
                selected: false
            }
        ]
    },
    {
        id: 4,
        type: 'multiple',
        text: 'Do you require Security Awareness Training',
        options: [
            {
                text: 'Yes, Phishing Awareness',
                selected: false
            },
            {
                text: 'Cyber Security Awareness Training (including Phishing)',
                selected: false
            },
            {
                text: 'No',
                selected: false
            }
        ]
    },
    {
        id: 5,
        type: 'single',
        text: 'Do you collect, store, or transmit personally identifiable information (PII)',
        options: [
            {
                text: 'Yes',
                selected: false
            },
            {
                text: 'No',
                selected: false
            }
        ]
    },
    {
        id: 6,
        type: 'single',
        text: 'Do you keep an up to date Asset Inventory?',
        options: [
            {
                text: 'Yes',
                selected: false
            },
            {
                text: 'No',
                selected: false
            }
        ]
    },
    {
        id: 7,
        type: 'single',
        text: 'Do you have a password policy?',
        options: [
            {
                text: 'Yes',
                selected: false
            },
            {
                text: 'No',
                selected: false
            }
        ]
    },
    {
        id: 8,
        type: 'single',
        text: 'Do you limit access according to the principle of least privilege?',
        options: [
            {
                text: 'Yes',
                selected: false
            },
            {
                text: 'No',
                selected: false
            }
        ]
    },
    {
        id: 9,
        type: 'single',
        text: 'Do you require multi-factor authentication for all remote access?',
        options: [
            {
                text: 'Yes, all employees including vendors and third party users are required to use MFA for remote access',
                selected: false
            },
            {
                text: 'Yes, all employees, not including vendors and third party users, are required to use MFA for remote access',
                selected: false
            },
            {
                text: 'No',
                selected: false
            }
        ]
    },
    {
        id: 9,
        type: 'single',
        text: 'Do you monitor all controls and/or devices connected to systems, software, and networks in order to prevent cyber attacks?',
        options: [
            {
                text: 'Yes',
                selected: false
            },
            {
                text: 'No',
                selected: false
            }
        ]
    },
    {
        id: 10,
        type: 'single',
        text: 'Does your organization have a documented controls plan that contains administrative, technical and physical safeguards your organization uses to collect, process, protect, store, transmit, dispose or otherwise handle our data (e.g., Backup, Archiving, Retention, Information Security Plan)?',
        options: [
            {
                text: 'Yes',
                selected: false
            },
            {
                text: 'No',
                selected: false
            }
        ]
    },
    {
        id: 11,
        type: 'single',
        text: 'Does the organization utilize full-disk encryption and/or mobile device management solutions to encrypt all storage on mobile devices?',
        options: [
            {
                text: 'Yes',
                selected: false
            },
            {
                text: 'No',
                selected: false
            }
        ]
    },
    {
        id: 12,
        type: 'single',
        text: 'Does the organizations systems or applications responsible for storing data provide access control mechanisms (e.g., unique user IDs, passwords standards, role based access)?',
        options: [
            {
                text: 'Yes',
                selected: false
            },
            {
                text: 'No',
                selected: false
            }
        ]
    },
    {
        id: 13,
        type: 'single',
        text: 'Does your organization have any auditable certifications (ex. ISO 27001, SOC 1, SOC 2 Type II, SOC 3, etc.) and can you provide documentation?',
        options: [
            {
                text: 'Yes',
                selected: false
            },
            {
                text: 'No',
                selected: false
            }
        ]
    },
    {
        id: 14,
        type: 'single',
        text: 'Does your organization utilize encryption methods for data in transit and data at rest where technically possible and legally permissible?',
        options: [
            {
                text: 'Yes',
                selected: false
            },
            {
                text: 'No',
                selected: false
            }
        ]
    },
    {
        id: 15,
        type: 'single',
        text: 'Are files and records reviewed, retained and purged in accordance with legal requirements, contractual obligations and service level agreements?',
        options: [
            {
                text: 'Yes',
                selected: false
            },
            {
                text: 'No',
                selected: false
            }
        ]
    },
    {
        id: 16,
        type: 'single',
        text: 'Does your organization commit to a service level agreement (SLA) response time if there is an emergency or critical/high incident (be it business related, IT or IT Security related)?',
        options: [
            {
                text: 'Yes',
                selected: false
            },
            {
                text: 'No',
                selected: false
            }
        ]
    },
    {
        id: 17,
        type: 'single',
        text: 'Does your organization have written business continuity/disaster recovery plans, which are tested on a periodic basis?',
        options: [
            {
                text: 'Yes',
                selected: false
            },
            {
                text: 'No',
                selected: false
            }
        ]
    },
    {
        id: 18,
        type: 'single',
        text: 'Does your company ensure adequate steps are taken to guard against unauthorized access to our company Data (e.g., firewall)?',
        options: [
            {
                text: 'Yes',
                selected: false
            },
            {
                text: 'No',
                selected: false
            }
        ]
    },
    {
        id: 19,
        type: 'single',
        text: 'Do you monitor for DDoS attacks?',
        options: [
            {
                text: 'Yes',
                selected: false
            },
            {
                text: 'No',
                selected: false
            }
        ]
    },
    {
        id: 20,
        type: 'single',
        text: 'Do you protect against spoofing of email services?',
        options: [
            {
                text: 'Yes',
                selected: false
            },
            {
                text: 'No',
                selected: false
            }
        ]
    },
    {
        id: 21,
        type: 'single',
        text: 'Does your company maintain up-to-date versions of anti-virus, anti-malware, EDR, as well as operating systems, networks and software security patches?',
        options: [
            {
                text: 'Yes, on a ad-hoc basis',
                selected: false
            },
            {
                text: 'Yes, on a consistent periodic basis',
                selected: false
            },
            {
                text: 'No',
                selected: false
            }
        ]
    },
    {
        id: 22,
        type: 'single',
        text: 'Do you secure web applications from SQL injection and cross-site scripting attacks?',
        options: [
            {
                text: 'Yes, on a ad-hoc basis',
                selected: false
            },
            {
                text: 'Yes, on a consistent periodic basis',
                selected: false
            },
            {
                text: 'No',
                selected: false
            }
        ]
    },
    {
        id: 23,
        type: 'single',
        text: 'Does your organization have a written plan to promptly identify, report, and respond to breaches of security related to our company data (e.g., incident response plan)?',
        options: [
            {
                text: 'Yes',
                selected: false
            },
            {
                text: 'No',
                selected: false
            }
        ]
    },
    {
        id: 24,
        type: 'single',
        text: 'Do you retire End of Life products',
        options: [
            {
                text: 'Yes, on a ad-hoc basis',
                selected: false
            },
            {
                text: 'Yes, on a consistent periodic basis',
                selected: false
            },
            {
                text: 'No',
                selected: false
            }
        ]
    },
    {
        id: 25,
        type: 'single',
        text: 'Does your organization hire an external audit firm to perform a compliance review of your operational controls',
        options: [
            {
                text: 'Yes, on a ad-hoc basis',
                selected: false
            },
            {
                text: 'Yes, on a consistent periodic basis',
                selected: false
            },
            {
                text: 'No',
                selected: false
            }
        ]
    },
    {
        id: 26,
        type: 'single',
        text: 'Do you perform regular internal and external vulnerability scanning?',
        options: [
            {
                text: 'Yes, on a ad-hoc basis',
                selected: false
            },
            {
                text: 'Yes, on a consistent periodic basis',
                selected: false
            },
            {
                text: 'No',
                selected: false
            }
        ]
    },
    {
        id: 27,
        type: 'single',
        text: 'Have you had a penetration test in the last 12 months?',
        options: [
            {
                text: 'Yes, but it is done on a ad-hoc basis',
                selected: false
            },
            {
                text: 'Yes, and it is done on a consistent periodic basis',
                selected: false
            },
            {
                text: 'No',
                selected: false
            }
        ]
    },
    {
        id: 28,
        type: 'single',
        text: 'Have you had any security or IT related audits in the last 12 months?',
        options: [
            {
                text: 'Yes, but it is done on a ad-hoc basis',
                selected: false
            },
            {
                text: 'Yes, and it is done on a consistent periodic basis',
                selected: false
            },
            {
                text: 'No',
                selected: false
            }
        ]
    },
    {
        id: 29,
        type: 'final',
        text: "Your questions are completed"
    }
]

startGame();