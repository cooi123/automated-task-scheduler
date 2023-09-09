import OpenAI from 'openai';
import { Task } from '../types/types'
import { GoogleEvent } from '../types/googleapitypes';
import { ChatCompletionMessage } from 'openai/resources/chat';
const openaikey = process.env.REACT_APP_OPENAI_API_KEY as string
const openai = new OpenAI({ apiKey: openaikey, dangerouslyAllowBrowser: true });


export async function sendGPT(tasks: Task[], events: GoogleEvent[]) {

    const tasksTobeCompleted = JSON.stringify(tasks)
    const scheduledEvents = JSON.stringify(events)
    console.log(tasksTobeCompleted, scheduledEvents)
    const taskPrompt: ChatCompletionMessage = {
        role: 'user',
        content: `Tasks needed to be complete ${tasksTobeCompleted}, Schduled Events: ${scheduledEvents}`

    }
    const systemPrompt: ChatCompletionMessage = {
        role: 'system',
        content: `You are are time manager, your are given a list of tasks
        The tasks are in the following schema Task = {
    title: string,
    tag: string
    urgency: 'High' | 'Medium' | 'Low'
    due: Date
    estimatHourToComplete: number
}, and a list of already scheduled events in the following schema Event={
    summary: string
    description?: string,
    notes: string,
    start: {
        dateTime: Date,
        timeZone: string
    }
    end: {
        dateTime: Date,
        timeZone: string
    }

}. Put the task title in the summary field on the event scema You are to schedule the tasks to fit into the schedule. To decide the most optimal schedule, take into account the due date, the urgency, and the estimated time to complete. 
Make sure to spread out the tasks so that the person is not overwhelmed. 
The events are already scheduled and cannot be changed. You are allowed to split a single task into multiple events on the schudule as long as the total time to complete the task is less than the estimated time to complete.
Be sure to also take into account the person scheule, do not scheule task on unreasonable time after midnight or before 6am. Strictly only return a list of events that needed to be scheuled to complete the tasks following the Event schema 
provided above in a valid json format. """Insert scheule here"""
        `
    }
    const completion = await openai.chat.completions.create({
        messages: [systemPrompt, taskPrompt],
        model: 'gpt-3.5-turbo',
    });
    const response = await completion.choices[0].message.content
    console.log(response)
    const eventsToBeScheduled: GoogleEvent[] = response ? JSON.parse(response) : []
    return eventsToBeScheduled
}