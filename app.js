'use strict';

const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
const config = require('config').get('ContractProjectApp');
const winston = require('winston');
const LOG = winston.loggers.get('application');

const cardname = config.get('cardname');
const namespace = config.get('namespace');

class App {
    constructor() {
        this.bizNetworkConnection = new BusinessNetworkConnection();
    }

    async init() {
        this.businessNetworkDefinition = await this.bizNetworkConnection.connect(cardname);
        LOG.info('ConstructionRegistry:<init>', 'businessNetworkDefinition obtained', this.businessNetworkDefinition.getIdentifier());
    }

    async bootstrap() {
        LOG.info('ConstructionRegistry:bootstrap', 'lets blockchain!');

        try {
            let factory = this.businessNetworkDefinition.getFactory();

            LOG.info('ConstructionRegistry:bootstrap', 'Creating an Owner');
            let ower =  factory.newResource(namespace, 'Owner', 'PO:1');
            owner.name = 'Owen Owner';
            owner.balance = 0;
            let ownerRegistry = await this.bizNetworkConnection.getParticipantRegistry(namespace + '.Owner');
            await ownerRegistry.add(owner);

            LOG.info('ConstructionRegistry:bootstrap', 'Creating an Architect');
            let architect =  factory.newResource(namespace, 'Architect', 'PA:1');
            architect.name = 'Alex Architect';
            architect.balance = 0;
            let architectRegistry = await this.bizNetworkConnection.getParticipantRegistry(namespace + '.Architect');
            await architectRegistry.add(architect);
            
            LOG.info('ConstructionRegistry:bootstrap', 'Creating a GC');
            let gc =  factory.newResource(namespace, 'GeneralContractor', 'GC:1');
            gc.name = 'Gene Connor';
            gc.balance = 0;
            let gcRegistry = await this.bizNetworkConnection.getParticipantRegistry(namespace + '.GeneralContractor');
            await gcRegistry.add(gc);

            LOG.info('ConstructionRegistry:bootstrap', 'Creating a Sub');
            let sub =  factory.newResource(namespace, 'SubContractor', 'SC:1');
            sub.name = 'Bob Builder';
            sub.balance = 0;
            let subRegistry = await this.bizNetworkConnection.getParticipantRegistry(namespace + '.SubContractor');
            await subRegistry.add(sub);

            LOG.info('ConstructionRegistry:bootstrap', 'Creating a Manufacturer');
            let supplier =  factory.newResource(namespace, 'Manufacturer', 'MF:1');
            supplier.name = 'Meh Supply';
            supplier.balance = 0;
            let supplierRegistry = await this.bizNetworkConnection.getParticipantRegistry(namespace + '.Manufacturer');
            await supplierRegistry.add(supplier);

            LOG.info('ConstructionRegistry:bootstrap', 'Creating a BuildingMaterial');
            let mat =  factory.newResource(namespace, 'BuildingMaterial', 'BM:1');
            mat.description = 'Steel Truss';
            mat.category = 'STEEL_FRAMES';
            mat.status = 'ORDERED';
            mat.deliverDateTime = '';
            mat.inspectDateTime = '';
            mat.price = 5000;
            mat.supplier = factory.newRelationship(namespace, 'Manufacturer', 'MF:1');
            mat.inspector = factory.newRelationship(namespace, 'GeneralContractor', 'GC:1');
            let matRegistry = await this.bizNetworkConnection.getAssetRegistry(namespace + '.BuildingMaterial');
            await matRegistry.add(supplier);

            LOG.info('ConstructionRegistry:bootstrap', 'Creating a ConstructionWork');
            let cw =  factory.newResource(namespace, 'ConstructionWork', 'CW:1');
            cw.description = 'Office Remodeling';
            cw.type = 'RENOVATION';
            cw.status = 'STARTED';
            cw.finishDateTime = '';
            cw.inspectDateTime = '';
            cw.cost = 50000;
            cw.builder = factory.newRelationship(namespace, 'SubContractor', 'SC:1');
            cw.inspector = factory.newRelationship(namespace, 'GeneralContractor', 'GC:1');
            let cwRegistry = await this.bizNetworkConnection.getAssetRegistry(namespace + '.ConstructionWork');
            await cwRegistry.add(supplier);

            LOG.info('ConstructionRegistry:bootstrap', 'Creating a Fund');
            let cf =  factory.newResource(namespace, 'ConstructionFund', 'CF:1');
            cf.description = 'Finally Fund';
            cf.balance = 200000;
            cf.owner = factory.newRelationship(namespace, 'Owner', 'PO:1');
            let cfRegistry = await this.bizNetworkConnection.getAssetRegistry(namespace + '.ConstructionFund');
            await cfRegistry.add(supplier);

            LOG.info('ConstructionRegistry:bootstrap', 'Creating a RCO');
            let rco =  factory.newResource(namespace, 'RequestChangeOrder', 'RCO:1');
            rco.description = 'RCO - 001';
            rco.total = 50000;
            rco.from = factory.newRelationship(namespace, 'GeneralContractor', 'GC:1');
            rco.to = factory.newRelationship(namespace, 'Owner', 'PO:1');
            let rcoRegistry = await this.bizNetworkConnection.getAssetRegistry(namespace + '.RequestChangeOrder');
            await rcoRegistry.add(supplier);
        } catch(error) {
            console.log(error);
            LOG.error('ConstructionRegistry:bootstrap', error);
            throw error;
        }
    }

    static async start() {
        let app = new App();
        await app.init();
        let results = await app.bootstrap();
        LOG.info('Default assets and participants added');
    }
}

App.start();
