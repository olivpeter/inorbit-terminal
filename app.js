const { select, input, checkbox } = require('@inquirer/prompts')

let goals = [{ value: 'Learn Javascript', checked: false }]

async function addGoal() {
    const goal = await input({ message: 'What is your goal?' })

    if (!goal) {
        console.log('⚠️ Please enter a goal')
        return
    }

    goals.push({ value: goal, checked: false })

    console.log(`✅ Added goal: ${goal}`)
}

async function listGoals() {
    const answers = await checkbox({
        message: 'Select the goals you want to complete:',
        choices: [...goals],
        instructions: false,
    })

    if (answers.length == 0) {
        console.log('⚠️ No goals were selected')
        return
    }

    goals.forEach((g) => {
        g.checked = false
    })

    answers.forEach((answer) => {
        const goal = goals.find((g) => {
            return g.value == answer
        })

        goal.checked = true
    })

    console.log('✅ Goal(s) marked as completed')
}

async function completedGoals() {
    const completed = goals.filter((goal) => {
        return goal.checked
    })

    if (completed.length == 0) {
        console.log('😒 No goals were completed')
        return
    }

    await checkbox({
        message: 'Completed goals:',
        choices: [...completed],
        instructions: false,
    })
}

async function start() {
    console.log('🔥 App is running')

    while (true) {
        const option = await select({
            message: 'InOrbit | What do you want to do?',
            choices: [
                {
                    name: 'Add goal',
                    value: 'add',
                },
                {
                    name: 'List goals',
                    value: 'list',
                },
                {
                    name: 'Goals completed',
                    value: 'completed',
                },
                {
                    name: 'Leave',
                    value: 'leave',
                },
            ],
        })

        switch (option) {
            case 'add':
                await addGoal()
                break

            case 'list':
                await listGoals()
                break

            case 'completed':
                await completedGoals()
                break

            case 'leave':
                console.log('👋 Ok. See ya!')
                return
        }
    }
}

start()
