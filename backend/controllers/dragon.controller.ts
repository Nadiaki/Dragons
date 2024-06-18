import { Request, Response } from 'express'
import DragonService from '../services/dragon.service'
export const allDragons = async (req: Request, res: Response) => {
  try {
    const result = await DragonService.getDragons()
        res.status(200).send(result)
  } catch (error) {
    console.log(error)
        res.status(500).send({ message: 'Something went wrong. The dragons are gone!' })
  }
}

export const fight = async (req: Request, res: Response) => {
    const dragons = req.body;
  
    if (dragons.length != 2) {
        res.status(400).send({ message: 'You need 2 participants for a fight.' });
    }

    try {
        const result = DragonService.fight(dragons);
        res.status(200).send(result);
      } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Something went wrong during the fight!' });
      }

}