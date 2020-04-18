import {RequestCheckers} from './request-checkers';

export abstract class Checkers {
  static readonly availableCheckers = {
    [RequestCheckers.acceptRequest]: RequestCheckers.canAcceptRequest,
    [RequestCheckers.rejectRequest]: RequestCheckers.canRejectRequest,
    [RequestCheckers.cancelRequest]: RequestCheckers.canCancelRequest,
    [RequestCheckers.deleteRequest]: RequestCheckers.canDeleteRequest,
    [RequestCheckers.manageDistributions]: RequestCheckers.canManageDistributions
  };

  static hasChecker(checker: string) {
    return checker in Checkers.availableCheckers;
  }
}
