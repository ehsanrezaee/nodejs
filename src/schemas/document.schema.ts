import { Prop, Schema,SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';


@Schema()
export class Entity{
    @Prop()
    id : number
    @Prop()
    name : string
}

export type EntityDocument = Entity & Document;
export const EntitySchema = SchemaFactory.createForClass(Entity);